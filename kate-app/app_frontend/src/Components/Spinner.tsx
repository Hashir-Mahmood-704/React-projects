import { Circles } from "react-loader-spinner"
const Spinner = ({ size }: { size?: number }) => {
  return <Circles color="#ED7014" width={size || 100} />
}

export default Spinner
