import { useEffect, useState } from "react";
import { createWorker } from 'tesseract.js';
const Upload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, settextResult] = useState("");
    console.log(typeof textResult);
    const handleChange = e => {
        setSelectedImage(e.target.files[0]);
    }

    if (textResult.length !== 0) {
        console.log(textResult.split(" "));
        const name = textResult.split(" ").slice(79, 82).join(" ").trimEnd();

        console.log(name);
        console.log(address)
    }


    const convertImageToText = async () => {
        try {
            const worker = await createWorker('eng');
            const ret = await worker.recognize(selectedImage);
            settextResult(ret.data.text);


            await worker.terminate();
        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        convertImageToText();
    }, [selectedImage])

    return (
        <div>
            <form action="" className="Upload">
                <input type="file" accept='image/*' id="FileUpload" onChange={handleChange} />
            </form>
            {/* <div className="result">
                {
                    selectedImage && (
                        <div className="box-image">
                            <img src={URL.createObjectURL(selectedImage)} alt="img" />
                        </div>
                    )
                }
            </div> */}
            {


                textResult && <div className="box-p">
                    <p>{textResult}</p>
                </div>
            }
        </div>


    )
}

export default Upload;