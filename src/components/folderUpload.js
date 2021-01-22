import React,{useState,useEffect} from 'react'
import S3 from "react-aws-s3";
import Loader from './Loader';

const FolderUpload = (props) => {
const id = window.location.href.split("/").pop();
const [loader,setLoader]=useState(false);
const onSubmit = async () => {
  //  e.preventDefault();
  if (!props.inputFolder) {
    alert("Please Choose a folder");
  } else {
     setLoader(true)
    const files = Object.entries(props.inputFolder.files);
    files.forEach(async (file) => {
      const path = await file[1].webkitRelativePath.split("/");
      path.pop();
      const config = {
        bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
        dirName: path.join("/") /* optional */,
        region: "ap-south-1",
        accessKeyId: process.env.REACT_APP_AWS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET,
        // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
      };

      const ReactS3Client = new S3(config);
      // e.target.files[0].name.split('.').pop();
      const newFileName = file[1].name.split(".");
      newFileName.pop();
      console.log(newFileName);
      ReactS3Client.uploadFile(file[1], newFileName.join(""))
        .then((data) => {
          console.log(data);
          
        })
        .catch((err) => console.error(err));
    });
    // console.log()
    
    let key = files[0][1].webkitRelativePath.split("/")[0];
    let url =null;
    console.log(key, url);
    fetch("https://s3drive-aws.herokuapp.com/folder/" + id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ key, url }),
    })   
      .then((res) => {
        setLoader(false);
          props.getData();
          props.setInputFolder();
        console.log(res);
      })
      
  }
}


  
    return (
      <div>
        {loader ? <Loader /> : null}
        <div class="form-group" style={{ width: "280px"}}>
          <div class="input-group mb-3">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile02"
                onChange={props.onChangeFolder}
                webkitdirectory="true"
                directory
                multiple
              />
              <label class="custom-file-label" for="inputGroupFile02">
                {props.inputFolder
                  ? props.inputFolder.folderName
                  : "select folder"}
              </label>
            </div>
            <div class="input-group-append">
              <button type="button" class="btn btn-primary" onClick={onSubmit}>
                Folder Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FolderUpload
