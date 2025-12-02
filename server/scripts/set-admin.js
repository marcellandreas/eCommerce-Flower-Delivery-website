/**
 * Script to set a user as admin in both database and Clerk
 * Usage: node scripts/set-admin.js <email>
 * Example: node scripts/set-admin.js user@example.com
 */

require('dotenv').config();
const { User } = require('../src/models');
const clerk = require('../src/config/clerk');

async function setUserAsAdmin(email) {
    try {
        // Find user in local database
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.error(`❌ User with email "${email}" not found in database`);
            process.exit(1);
        }

        console.log(`\n📋 Found user:`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Name: ${user.first_name} ${user.last_name}`);
        console.log(`   Current Role: ${user.role}`);
        console.log(`   Clerk ID: ${user.clerk_id}\n`);

        // Update role in Clerk
        try {
            console.log('🔄 Updating role in Clerk...');
            await clerk.users.updateUser(user.clerk_id, {
                publicMetadata: { role: 'admin' }
            });
            console.log('✅ Successfully updated role in Clerk');
        } catch (clerkError) {
            console.error('❌ Error updating Clerk:', clerkError.message);
            console.log('⚠️  Continuing with local database update...');
        }

        // Update role in local database
        console.log('🔄 Updating role in local database...');
        await user.update({ role: 'admin' });
        console.log('✅ Successfully updated role in database');

        // Verify the changes
        const updatedUser = await User.findOne({ where: { email } });
        console.log(`\n✅ User "${email}" is now an admin!`);
        console.log(`   New Role: ${updatedUser.role}\n`);

        // Try to verify in Clerk
        try {
            const clerkUser = await clerk.users.getUser(user.clerk_id);
            console.log('✅ Clerk verification:');
            console.log(`   Role in Clerk: ${clerkUser.publicMetadata?.role || 'not set'}\n`);
        } catch (err) {
            console.log('⚠️  Could not verify in Clerk\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error(error);
        process.exit(1);
    }
}

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
    console.error('❌ Please provide an email address');
    console.log('Usage: node scripts/set-admin.js <email>');
    console.log('Example: node scripts/set-admin.js user@example.com');
    process.exit(1);
}

// Run the script
console.log(`\n🚀 Setting user "${email}" as admin...\n`);
setUserAsAdmin(email);
