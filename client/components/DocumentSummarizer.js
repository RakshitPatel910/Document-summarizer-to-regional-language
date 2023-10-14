import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
// import SummaryTool from 'node-summary';
import DocumentPicker from 'react-native-document-picker';

const DocumentSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const [selected, setSelected] = React.useState("");
  const data = [
      {key:'1', value:'Hindi'},
      {key:'2', value:'Marathi'},
      {key:'3', value:'Gujrati'},
  ]

  // const selectDoc = async () => {
  //   try {
  //     const doc = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
  //     })
  //     console.log(doc)
  //   } catch(err) {
  //     if(DocumentPicker.isCancel(err)) 
  //       console.log("User cancelled the upload", err);
  //     else 
  //       console.log(err)
  //   }
  // }

  

//   const summarizeDocument = () => {
//     if (inputText) {
//       SummaryTool.summarize(inputText, (err, summary) => {
//         if (!err) {
//           setSummary(summary);
//         } else {
//           console.error(err);
//         }
//       });
//     }
//   };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{textAlignVertical: "center",textAlign: "center",fontSize: 25,fontWeight: 'bold',marginBottom: 50}}>Welcome to Document Summarizer to Regional Language</Text>
      <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Select the Language'
        />


    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 28,
          textAlign: 'center',
          marginVertical: 40,
        }}>
        Upload Document 
      </Text>
        <Button title="Select Document"  />
    </View>

      <View style={{ marginRight: 100,marginLeft:100,marginTop:25,marginBottom:20 }}>
      <Button title="Submit" type="solid"  iconRight />
      </View>

      <Text style={{ marginTop: 10, fontSize: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Summary:</Text>
        {'\n'}
        {summary}
      </Text>

    </View>
  );
};

export default DocumentSummarizer;