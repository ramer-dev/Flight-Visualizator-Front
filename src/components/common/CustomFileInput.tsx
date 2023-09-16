import { Button, TextField } from '@mui/material'
import React, { ChangeEvent, useEffect } from 'react'


interface Props {
    id: number;
    multiple?: boolean;
}
function CustomFileInput({ id, multiple }: Props) {
    const uploadInputRef = React.useRef<HTMLInputElement>(null);
    const [file, setFile] = React.useState<any>(null);

    useEffect(() => {
        return () => {
            setFile(null)
        }
    }, [file])

    // const length = () : string => {
    //     const files = uploadInputRef?.current?.files;
    //     if (files) {
    //         if (files.length === 1) {
    //             return files[0].name;
    //         } else if (files.length) {
    //             return `${files.length}개의 파일`
    //         } else {
    //             return '파일 없음'
    //         }
    //     }
    //     return '파일 없음';
    // }
    return (
        <div>

            <input style={{ display: 'none' }} ref={uploadInputRef} multiple={true} onChange={(e: any) => { setFile(e.target.files) }} type='file'></input>
            <TextField type={'text'} size="small" disabled value={file?.length === 1 ? `${file[0].name}` :  file?.length > 1 ? `${file.length}개의 파일` :'파일 선택'}/>
            <Button variant='outlined' onClick={() => { uploadInputRef.current && uploadInputRef.current.click() }}>업로드</Button>
        </div>

    )
}

export default CustomFileInput