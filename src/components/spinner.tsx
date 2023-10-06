
import ClipLoader from 'react-spinners/ClipLoader';
import utilsStyles from '@/../styles/utils.module.css';


type SpinnerProps = {
	loading: boolean;
	text?: string;
}

export default function Spinner({ loading, text }: SpinnerProps) {
	return (
		<div className={utilsStyles.flexRowCenter}>
			<ClipLoader color="#52bfd9" size={20} loading={loading} />
			{text && <span>{text}</span>}
		</div>
	);
};