import { memo } from "react";
import PropTypes from "prop-types";
import { Text } from "../atoms";
import { AppleIcon, GoogleIcon } from "../atoms/Icon";

const SOCIAL_BUTTONS = [
  {
    id: 'google',
    icon: GoogleIcon,
    label: 'CONTINUE WITH GOOGLE',
    ariaLabel: 'Continue with Google',
  },
  {
    id: 'apple',
    icon: AppleIcon,
    label: 'CONTINUE WITH APPLE',
    ariaLabel: 'Continue with Apple',
  },
];

const SocialButton = memo(({ Icon, label, ariaLabel, onClick }) => (
  <button
    className="flex-1 border border-lightGray px-4 py-4 flex justify-center items-center gap-2 hover:bg-gray-50 hover:border-gray transition-all duration-200"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <Icon />
    <Text level="h6">{label}</Text>
  </button>
));

SocialButton.displayName = "SocialButton";

SocialButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export const SocialLoginButtons = memo(({ onGoogleLogin, onAppleLogin }) => {
  const handleSocialLogin = (type) => {
    if (type === 'google' && onGoogleLogin) {
      onGoogleLogin();
    } else if (type === 'apple' && onAppleLogin) {
      onAppleLogin();
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <Text level="body" className="text-gray-600">
        Instantly login or sign up via Google
      </Text>
      
      <div className="flex gap-4 flex-col md:flex-row">
        {SOCIAL_BUTTONS.map(({ id, icon, label, ariaLabel }) => (
          <SocialButton
            key={id}
            Icon={icon}
            label={label}
            ariaLabel={ariaLabel}
            onClick={() => handleSocialLogin(id)}
          />
        ))}
      </div>
    </section>
  );
});

SocialLoginButtons.displayName = "SocialLoginButtons";

SocialLoginButtons.propTypes = {
  onGoogleLogin: PropTypes.func,
  onAppleLogin: PropTypes.func,
};