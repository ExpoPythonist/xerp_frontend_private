import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (data = {}) => {
  const { type, position, message } = data
  toast(message || "Wow so easy !", {
    type: type || 'default',
    position: position || 'bottom-right'
  })
}

export default Toast;