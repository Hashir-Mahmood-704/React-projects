import { ColorRing } from "react-loader-spinner"
const Spinner = ({ width, height }: { width: string; height: string }) => {
  return (
    <ColorRing
      visible={true}
      height={height}
      width={width}
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#000", "#000", "#000", "#000", "#000"]}
    />
  )
}

export default Spinner
