

type FormHeaderProps = {
	text: string;
};


export default function FormHeader({ text }: FormHeaderProps) {
	return (
		<header>
			<h1>{text}</h1>
		</header>
	);
}