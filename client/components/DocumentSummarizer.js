import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import SummaryTool from 'node-summary';

const DocumentSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

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
      <TextInput
        style={{ height: 150, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        multiline
        placeholder="Enter your document here..."
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Summarize"  />
      <Text style={{ marginTop: 10, fontSize: 16 }}>
        <Text style={{ fontWeight: 'bold' }}>Summary:</Text>
        {'\n'}
        {summary}
      </Text>
    </View>
  );
};

export default DocumentSummarizer;