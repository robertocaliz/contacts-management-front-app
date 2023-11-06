

type FormHeaderProps = {
	text: string;
};


export default function FormHeader({ text }: FormHeaderProps) {
	return (
		<header>
			<h2 style={{ color: '#1f1f1f' }}>{text}</h2>
		</header>
	);
}