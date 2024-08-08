import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
const copyToClipboard = (e) => {
  let isCopy = copy(e);
  if (isCopy) {
    toast.success("Copied to Clipboard");
  }
};
export default copyToClipboard;
