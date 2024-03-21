import Link from 'next/link';

const SignupRecoverButton = ({ text }: { text: string }) => {
    return <Link href='/signup/recover'>{text}</Link>;
};

export default SignupRecoverButton;
