

type FormHeaderProps = {
	text: string;
};


export default function FormHeader({ text }: FormHeaderProps) {
	return (
		<header>
			<h1 style={{ color: '#1f1f1f' }}>{text}</h1>
		</header>
	);
}