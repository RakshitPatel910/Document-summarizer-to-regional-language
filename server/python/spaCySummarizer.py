import spacy
import sys
import re
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest
from pdfminer.high_level import extract_text


nlp = spacy.load("en_core_web_sm")

# text = '''Analytical marketing: How Turkcell reduced their sales cycle from weeks to days.There are an enormous number of solutions telecommunications companies can provide, but most customers are only interested in a select few. Analytical marketing is the practice of using customer data to identify which consumers will most likely benefit from which products. This involves using consumer information to create microsegments, or personas that describe smaller sets of customers rather than large, big-picture details. It also includes detecting specific behaviors that prompt a new product offer, such as suggesting an international data plan to a customer who frequently sends texts to friends in other countries.
# The first step in leveraging analytical marketing is to gather data. Companies need to strike a balance between obtaining high-quality, comprehensive information and maintaining trust with the consumer.
# With the increasing capabilities for data mining, consumers have become protective of their personal information. Shady practices like obtaining and using data without notifying the customer, or selling and buying information from third-party sources have left consumers scarred and wary.
# Ironically, consumers also become frustrated when they perceive companies to not have a good understanding of their needs or offer random products rather than relevant ones. This complex dynamic means telecom businesses must gather high-quality information, but use it in a responsible, transparent way.
# A 2011 marketing campaign completed by Turkcell, an Istanbul-based cellphone provider, demonstrated the successful use of consumer data. The company began reviewing customer data in real time, allowing them to better identify individuals’ needs at that time. As a result, they were able to shorten their marketing cycle from several weeks to several days and increase revenue by $15 million that year, according to a Strategy& report from PwC.'''

text1 = sys.stdin.read()
utext = extract_text('./uploads/output.pdf')

pattern = r'[^\x00-\x7F]'
text = re.sub(pattern, ' ', utext)

doc = nlp(text=text)

tokens = [token.text for token in doc]
# print(tokens)

stopwords = list(STOP_WORDS)
punctuation = punctuation + '\n' + '\n\n'

word_dict = {}

for word in doc :
    word = word.text.lower()

    if word not in stopwords :
        if word not in punctuation :
            if word in word_dict.keys() :
                word_dict[word] += 1
            else :
                word_dict[word] = 1

# print(word_dict)

max_frequency = max(word_dict.values())

for word in word_dict.keys() :
    word_dict[word] = word_dict[word] / max_frequency

# print(word_dict)

sentence_tokens = [sent for sent in doc.sents]

sentence_scores = []

for i, sent in enumerate(doc.sents) :
    score = 0
    for word in sent :
        word = word.text.lower()
        if word in word_dict.keys() :
            score += word_dict[word]
    
    sentence_scores.append((i, sent.text.replace("\n", " "), score))
    # sentence_scores.append((i, sent.text.replace("\n", " "), score/len(sent)))

select_length = int(len(sentence_tokens) * 0.3)

summary = nlargest(select_length , sentence_scores , key = lambda x: -x[0])
# print(summary)

final_summary = ''
for sent in summary :
    final_summary += sent[1] + " "

print(final_summary) 
