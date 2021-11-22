import {Props} from "./props";
import './styles.scss'

export const Checkbox = (props: Props): JSX.Element => {
    return <input {...props} type="checkbox"/>
}