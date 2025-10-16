import './Alert.css';

type AlertProps = {
    type: "success" | "error" | "info" | "warning";
    message: string;
}

export function Alert({ type, message }: AlertProps) {
    return <div className={`alert ${type}`}>{message}</div>
}