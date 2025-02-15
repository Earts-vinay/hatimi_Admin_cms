import React from 'react'
import UploadFiles from '../components/custom/UploadFiles'
import { Select } from 'antd'
const {Option} = Select
const FrontDesk = () => {
  return (
<>
<UploadFiles/>
<Select
  style={{ width: "100%" }}
  placeholder="Select Property"

  
 
>

      <Option >
     hi
      </Option>
  
</Select>
</>  
)
}

export default FrontDesk