const { Webhook } = require('svix');
const { User } = require('../models');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * Handle Clerk Webhooks
 * @route POST /api/v1/webhooks/clerk
 */
exports.handleClerkWebhook = asyncHandler(async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({
            success: false,
            message: 'Error occured -- no svix headers',
        });
    }

    // Get the body
    const body = req.body.toString();

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return res.status(400).json({
            success: false,
            message: 'Error occured',
        });
    }

    // Handle the event
    const eventType = evt.type;
    const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = evt.data;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);

    console.log('Webhook payload data:', evt.data); // Debug logging

    if (eventType === 'user.created' || eventType === 'user.updated') {
        // Clerk sends email_addresses as an array. We take the first one.
        // Ensure we handle cases where it might be missing or structured differently.
        const email = email_addresses && email_addresses.length > 0
            ? email_addresses[0].email_address
            : null;

        const phone = phone_numbers && phone_numbers.length > 0
            ? phone_numbers[0].phone_number
            : null;

        if (!email) {
            console.error('Missing email in webhook payload for user:', id);
            // Return success to acknowledge webhook, but log error
            return res.status(200).json({ success: true, message: 'Skipped: No email found' });
        }

        const userData = {
            clerk_id: id,
            email,
            first_name,
            last_name,
            image_url,
            phone,
        };

        // Upsert user
        const [user, created] = await User.findOrCreate({
            where: { clerk_id: id },
            defaults: userData,
        });

        if (!created) {
            await user.update(userData);
        }

        console.log(`User ${id} ${created ? 'created' : 'updated'} via webhook`);
    } else if (eventType === 'user.deleted') {
        await User.destroy({ where: { clerk_id: id } });
        console.log(`User ${id} deleted via webhook`);
    }

    return res.status(200).json({
        success: true,
        message: 'Webhook received',
    });
});
