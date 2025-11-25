function photobase64(file: any) {
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    console.log("base64:", base64);
  };
  reader.readAsDataURL(file);
}
export default photobase64;
