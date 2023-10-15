import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DocumentPicker from'expo-document-picker';
import axios from 'axios';
// import SummaryTool from 'node-summary';
// import DocumentPicker from 'react-native-document-picker';


const DocumentSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const [selected, setSelected] = React.useState("");
  const data = [
      {key:'1', value:'Hindi'},
      {key:'2', value:'Marathi'},
  ]

  const [Summarize, setSummarize] = React.useState("");
  const info = [
      {key:'1', value:'Noraml'},
      {key:'2', value:'Good'},
      {key:'3', value:'Best'}
  ]

  const [Result, setResult] = useState('');

  

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
  const [selectedDocument, setSelectedDocument] = useState(null);

  const sendFileToBackend = async (fileUri) => {
    console.log(4)
    
    // try {
      var formData = new FormData();
      const data = JSON.stringify({
        uri: selectedDocument.assets[0], // The file URI from the DocumentPicker
        // name: selectedDocument.assets[0].name, // Specify the file name
        name: 'text', // Specify the file name
        type: selectedDocument.assets[0].mimeType, // Specify the file type
      })
      formData.append('file', data);

      console.log(5, data.uri)
      console.log(selectedDocument)
      await axios.post('http://localhost:3010/summarizer/summarize', data, {
        headers: {
          'Content-Type': 'application/pdf',
        },
        transformRequest: (data, error) => {
          return formData;
      },
      })
  
      // Handle the response from the backend
  };

  const pickDocument = async () => {
    try {
      console.log(1)
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the file type(s) you want to allow (PDF in this case)
      multiple: false})
      .then((result) => {
        console.log(result)
        if (result.canceled == false) {
          console.log(2)
          setSelectedDocument(result);
          console.log(result)
          console.log(result.assets[0].uri)
        } else {
          setSelectedDocument(null);
        }
      })

    } catch (error) {
      console.error(error);
    }

    console.log(selectedDocument)
  }

  const handleSelectDocument = async () => {
    console.log(0)
    await pickDocument()
      // .then((result) => {
      //   if (result) {
      //     console.log(3)
      //     sendFileToBackend(result.uri);
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
      console.log(6)
  }

  const handleSubmit = async () => {
    console.log(selectedDocument)
    await sendFileToBackend();
  }

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
        <Button title="Select Document" onPress={() => handleSelectDocument()} />
    </View>

    <View style={{marginTop:30}}>
    <SelectList
        setSelected={(val) => setSummarize(val)} 
        data={info} 
        save="value"
        placeholder='Select Summarizing option'
        />
    </View>

      <View style={{ marginRight: 100,marginLeft:100,marginTop:25,marginBottom:20 }}>
      <Button title="Submit" type="solid"  iconRight onPress={() => handleSubmit()}/>
      </View>

      {/* <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: 'bold',fontSize: 25 }}>Summary:</Text>
        {'\n'}
        {summary}
      </View> */}

    </View>
  );
};

export default DocumentSummarizer;