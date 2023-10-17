import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as DocumentPicker from'expo-document-picker';
import axios from 'axios';

const DocumentSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const [language, setLanguage] = useState('');
  const data = [
      {key: 1, value:'Hindi'},
      {key: 2, value:'Marathi'},
  ]

  const [summarizationType, setSummarizationType] = useState('');
  const info = [
      {key: 1, value:'Short'},
      {key: 2, value:'Normal'},
      {key: 3, value:'Long'}
  ]



  const [Result, setResult] = useState('');

  
  const [selectedDocument, setSelectedDocument] = useState(null);

  const sendFileToBackend = async (fileUri) => {
    // console.log(4)
    
      var formData = new FormData();
      // console.log(language, summarizationType)
      const data = JSON.stringify({
        uri: selectedDocument.assets[0], 
        name: 'text', 
        type: selectedDocument.assets[0].mimeType, 
        language: language,
        summarizationType: summarizationType
      })

      formData.append('file', data);

      await axios.post('http://localhost:3010/summarizer/summarize', data, {
        headers: {
          'Content-Type': 'application/pdf',
        },
        transformRequest: (data, error) => {
          return formData;
      },
      }).then( (result) => {
        console.log(result.data.summaryText)
        console.log(result.data.translatedSummary)
        if( result.data.success == true ) {
          // setSummary('');
          setSummary(result.data.summaryText);
          setSummary(result.data.translatedSummary);
        }
        else setSummary('Something went wrong')
      })
  
  };

  const pickDocument = async () => {
    try {
      // console.log(1)
      let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Specify the file type(s) you want to allow (PDF in this case)
      multiple: false})
      .then((result) => {
        console.log(result)
        if (result.canceled == false) {
          // console.log(2)
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
    // console.log(0)
    await pickDocument()
  }

  const handleSubmit = async () => {
    // console.log(selectedDocument)
    console.log(summarizationType);
    console.log(language);
    await sendFileToBackend();
  }

  return (
    <>
      <View style={{ padding: 20 }}>
        <Text style={{textAlignVertical: "center",textAlign: "center",fontSize: 25,fontWeight: 'bold',marginBottom: 50}}>Welcome to Document Summarizer to Regional Language</Text>

        <SelectList
          setSelected={(val) => setLanguage({ language: val, key: val == 'Hindi' ? 1 : 2 })} 
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
          setSelected={(val) => setSummarizationType({ type: val, ratio: val == 'Short' ? 0.3 : ( val == 'Normal' ? 0.5 : 0.7 ) })} 
          data={info} 
          save="value"
          placeholder='Select Summarizing option'
          />
      </View>

        <View style={{ marginRight: 100,marginLeft:100,marginTop:25,marginBottom:20 }}>
        <Button title="Submit" type="solid"  iconRight onPress={() => handleSubmit()}/>
        </View>

      </View>

      <Text style={{ margin: 10, fontWeight: 'bold',fontSize: 25, justifyContent:'center' }}>Summary:</Text>
      <View style={{ margin: 10 }}>
        {'\n'}
        {'\n'}
        {summary}
      </View>
      {/* <View>
        <Text>{ summary }</Text>
      </View> */}
    </>
  );
};

export default DocumentSummarizer;