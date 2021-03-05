import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
export default function TextEditor({SetDescription,value}) {
    // const[setValue ,ShowSetVakue]=React.useState();
    return(
        <SunEditor
        showToolbar={true}
        enableToolbar={true}
        onChange={(val)=>{
          console.log(val)
          SetDescription(val);
        }}
        defaultValue={value}
        setOptions={{
          height: 200,
          buttonList: [
            ["font", "align"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["image"],
            ["table"],
            ['fullScreen', 'showBlocks', 'codeView'],
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          // Other option
        }}
      />
    )
}
