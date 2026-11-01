export interface StepItem {
  stepNumber: number;
  title: string;
  category: 'Foundation' | 'Environment' | 'Data & ML' | 'Web Development' | 'Testing & Deployment' | 'Academic Report & Viva';
  summary: string;
  content: string;
  codeSnippets?: { title: string; language: string; code: string }[];
  keyTakeaways: string[];
}

export interface VivaQuestion {
  id: number;
  category: 'ML' | 'Python' | 'Project' | 'NLP';
  question: string;
  answer: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  // 15 Machine Learning Questions
  {
    id: 1,
    category: 'ML',
    question: 'What is the difference between Supervised and Unsupervised Learning?',
    answer: 'In Supervised Learning, the training dataset consists of input features along with labeled ground-truth targets (e.g., news text paired with "REAL" or "FAKE" labels). In Unsupervised Learning, there are no target labels provided; the algorithm discovers hidden patterns or clusters on its own (e.g., K-Means clustering).'
  },
  {
    id: 2,
    category: 'ML',
    question: 'Why did we use the Passive Aggressive Classifier for text classification?',
    answer: 'The Passive Aggressive Classifier is an online margin-based algorithm. It remains passive when an incoming text sample is correctly classified within the margin, but becomes aggressive and recalculates weight parameters whenever a classification error occurs. It is computationally fast, memory-efficient, and excels with large, high-dimensional sparse TF-IDF text representations.'
  },
  {
    id: 3,
    category: 'ML',
    question: 'What is TF-IDF and how does it work mathematically?',
    answer: 'TF-IDF stands for Term Frequency-Inverse Document Frequency. TF measures how frequently a word appears in a document: TF(t, d) = count(t in d) / total words in d. IDF penalizes common words across all documents: IDF(t) = log((1 + N) / (1 + DF(t))) + 1. The final weight is TF * IDF, giving higher importance to terms that are distinctive to a specific document rather than universally frequent.'
  },
  {
    id: 4,
    category: 'ML',
    question: 'What is the purpose of train_test_split and why is stratify=y used?',
    answer: 'train_test_split partitions the dataset into an 80% training set and a 20% test set to prevent data leakage and evaluate how well the model generalizes to unseen data. Setting stratify=y ensures that the proportion of REAL and FAKE classes remains exactly identical in both training and testing subsets, preventing sample distribution skew.'
  },
  {
    id: 5,
    category: 'ML',
    question: 'What is the Confusion Matrix and what do its four quadrants represent?',
    answer: 'A Confusion Matrix is a 2x2 performance table comparing actual ground truth against model predictions. For Fake news detection: True Positive (TP): Model correctly flagged Fake as Fake. True Negative (TN): Model correctly identified Real as Real. False Positive (FP / Type I Error): Real news incorrectly flagged as Fake. False Negative (FN / Type II Error): Fake news mistakenly classified as Real.'
  },
  {
    id: 6,
    category: 'ML',
    question: 'What is the difference between Precision and Recall?',
    answer: 'Precision = TP / (TP + FP). It answers: "Of all the news articles the model flagged as Fake, how many were actually Fake?" Recall = TP / (TP + FN). It answers: "Of all the actual Fake news articles in the dataset, how many did the model catch?" High precision avoids falsely accusing legitimate journalism, while high recall catches widespread misinformation.'
  },
  {
    id: 7,
    category: 'ML',
    question: 'Why is Accuracy alone not always a reliable metric in Machine Learning?',
    answer: 'If a dataset is imbalanced (e.g., 95% Real and 5% Fake), a naive model that predicts "Real" 100% of the time will achieve 95% accuracy while failing to detect a single piece of fake news. That is why F1-Score (harmonic mean of Precision and Recall) and Confusion Matrices are essential for balanced evaluation.'
  },
  {
    id: 8,
    category: 'ML',
    question: 'What is the role of the random_state parameter in scikit-learn?',
    answer: 'The random_state parameter seeds the pseudorandom number generator. Setting random_state=42 guarantees deterministic, reproducible results so that training/test splits and stochastic algorithm initializations yield identical outputs across repeated runs.'
  },
  {
    id: 9,
    category: 'ML',
    question: 'How does Logistic Regression perform classification on text data?',
    answer: 'Logistic Regression calculates a linear combination of input TF-IDF feature weights (z = w^T * x + b) and passes it through the sigmoid function: σ(z) = 1 / (1 + e^(-z)). This squashes the output into a probability between 0 and 1, applying a threshold (typically 0.5) to decide REAL vs FAKE.'
  },
  {
    id: 10,
    category: 'ML',
    question: 'Why does Multinomial Naive Bayes make the "naive" assumption?',
    answer: 'Multinomial Naive Bayes assumes that the conditional presence of every word is entirely independent of all other words given the document class: P(w1, w2 | Class) = P(w1 | Class) * P(w2 | Class). In reality, words exhibit semantic dependencies, but Naive Bayes still performs remarkably well as a fast, low-parameter text baseline.'
  },
  {
    id: 11,
    category: 'ML',
    question: 'What is Overfitting and how do we prevent it in our project?',
    answer: 'Overfitting occurs when a model memorizes idiosyncrasies and noise in the training data rather than generalizable rules, leading to near-100% train accuracy but poor test accuracy. We prevent it using train-test splitting, L2 regularization in Logistic Regression, max_df and min_df pruning in TF-IDF, and stopword removal.'
  },
  {
    id: 12,
    category: 'ML',
    question: 'What is an N-Gram and why did we set ngram_range=(1, 2)?',
    answer: 'An n-gram is a contiguous sequence of n items from a text. A unigram (n=1) is a single word ("lemon"), while a bigram (n=2) is a two-word pair ("lemon water" or "miracle cure"). Setting ngram_range=(1, 2) allows the model to capture vital contextual phrases that convey sensationalism or attribution far better than isolated words alone.'
  },
  {
    id: 13,
    category: 'ML',
    question: 'What is the difference between LinearSVC and Support Vector Machine with RBF kernel?',
    answer: 'LinearSVC uses a linear kernel optimized specifically for massive high-dimensional sparse feature spaces (like 10,000 TF-IDF features). It computes in O(N) time with liblinear. Non-linear kernels like RBF map features to infinite dimensions, which is computationally expensive and generally unnecessary for text where classes are already linearly separable.'
  },
  {
    id: 14,
    category: 'ML',
    question: 'What is the F1-Score formula and why is the harmonic mean used?',
    answer: 'F1 = 2 * (Precision * Recall) / (Precision + Recall). The harmonic mean is used rather than the arithmetic mean because it severely penalizes extreme disparities; if either Precision or Recall drops to zero, the F1-score plummets to zero.'
  },
  {
    id: 15,
    category: 'ML',
    question: 'Does our model verify real-world factual truth?',
    answer: 'No. The model evaluates linguistic style, sensational lexical cues, syntactic structure, and statistical word correlations learned from the training corpus. It cannot access external real-time facts or verify historical events, which is an important limitation to emphasize during project evaluation.'
  },

  // 10 Python Questions
  {
    id: 16,
    category: 'Python',
    question: 'What is a Python virtual environment and why must every developer use one?',
    answer: 'A virtual environment (created with python -m venv venv) is an isolated workspace directory containing its own Python interpreter and site-packages folder. It prevents dependency conflicts between different projects and ensures team members install identical library versions specified in requirements.txt without polluting the global system Python.'
  },
  {
    id: 17,
    category: 'Python',
    question: 'What is Joblib and why is it preferred over Python\'s standard pickle for ML?',
    answer: 'Joblib is an optimized serialization library that handles large NumPy arrays and scientific matrices significantly faster than standard pickle. In scikit-learn, joblib uses memory-mapping techniques and compressed disk buffers to serialize and reload large trained estimators efficiently.'
  },
  {
    id: 18,
    category: 'Python',
    question: 'What does if __name__ == "__main__": do in Python?',
    answer: 'It checks whether the script is being executed directly by the user (where __name__ is set to "__main__") or imported into another script as a module. This ensures that training scripts or server boot logic only execute when explicitly run in terminal, and not when helper functions are imported.'
  },
  {
    id: 19,
    category: 'Python',
    question: 'What is the purpose of pandas DataFrame in data preprocessing?',
    answer: 'Pandas DataFrames provide tabular, high-performance two-dimensional data structures with labeled axes (rows and columns). They offer vectorized operations for filtering, handling missing null entries with dropna(), removing duplicates with drop_duplicates(), and mapping lambda functions.'
  },
  {
    id: 20,
    category: 'Python',
    question: 'How does regex (re module) assist in NLP text cleaning?',
    answer: 'The re module allows pattern-based string substitutions using compiled regular expressions. In our project, re.sub(r"https?:\\/\\/\\S+|www\\.\\S+", "", text) strips hyperlinks, and re.sub(r"<.*?>", "", text) removes HTML tags prior to tokenization.'
  },
  {
    id: 21,
    category: 'Python',
    question: 'What is the difference between Flask and Django?',
    answer: 'Flask is a lightweight WSGI micro-framework that provides minimalistic core routing and request handling, leaving database and architecture choices to the developer. Django is a "batteries-included" full-stack framework with an integrated ORM, admin panel, and authentication system. Flask is ideal for lightweight ML model deployment.'
  },
  {
    id: 22,
    category: 'Python',
    question: 'What is a docstring and PEP 8 in Python?',
    answer: 'A docstring is a string literal appearing as the first statement in a function, class, or module (enclosed in triple quotes) used for interactive documentation and help(). PEP 8 is the official Python Enhancement Proposal describing style guidelines for readability (naming conventions, 4-space indentation, 79-character line limits).'
  },
  {
    id: 23,
    category: 'Python',
    question: 'How does Flask render HTML templates and access static files?',
    answer: 'Flask uses the Jinja2 templating engine. The render_template("index.html", key=value) function reads files from the "templates" folder and dynamically injects Python variables using {{ variable }} syntax. CSS, JavaScript, and images are served statically from the "static" folder via url_for("static", filename="style.css").'
  },
  {
    id: 24,
    category: 'Python',
    question: 'What is the difference between a GET request and a POST request in Flask?',
    answer: 'A GET request requests data from a specified resource and appends parameters in the URL query string, making it visible and limited in length. A POST request submits data within the HTTP request body, which is required for submitting long multi-paragraph news articles securely.'
  },
  {
    id: 25,
    category: 'Python',
    question: 'What is pip and what command generates requirements.txt?',
    answer: 'pip is the package installer for Python that downloads and installs distributions from the Python Package Index (PyPI). The command pip freeze > requirements.txt captures all currently installed libraries and their pinned versions in the active environment.'
  },

  // 5 Project-Specific Questions
  {
    id: 26,
    category: 'Project',
    question: 'How did you handle the cold-start problem when model files do not yet exist?',
    answer: 'In app.py, the load_artifacts() function checks for the physical existence of fake_news_model.joblib and tfidf_vectorizer.joblib. If missing, it provides a descriptive error prompt instructing the user to execute "python train_model.py". In train_model.py, a starter dataset is automatically generated if news.csv is absent.'
  },
  {
    id: 27,
    category: 'Project',
    question: 'Why did we combine the title and text columns before TF-IDF vectorization?',
    answer: 'News headlines frequently contain the most sensational, clickbait, and emotionally charged linguistic tokens, while the body text provides grammatical context and factual citation density. Concatenating both into a single combined string provides the vectorizer with comprehensive textual signals.'
  },
  {
    id: 28,
    category: 'Project',
    question: 'How did you ensure the project is responsive and user-friendly for non-technical users?',
    answer: 'The web interface features responsive CSS media queries for desktop and mobile, quick-fill sample buttons so reviewers can test real and fake articles with one click, a clear color-coded status badge (Red for Fake, Green for Real), a confidence percentage indicator, and input error validations.'
  },
  {
    id: 29,
    category: 'Project',
    question: 'What are the main ethical considerations and societal impacts of this project?',
    answer: 'Automated fake news detection helps citizens and content moderators identify manipulative disinformation, mitigating societal panic and medical misinformation. However, false positives could infringe on free speech or legitimate investigative journalism; hence, models must act as assistive warning flags with clear disclaimers, not authoritarian censors.'
  },
  {
    id: 30,
    category: 'Project',
    question: 'What are the three most promising future enhancements for this system?',
    answer: '1. Transformer integration: Implementing fine-tuned RoBERTa or BERT for deep semantic context and sarcasm detection. 2. Knowledge Graph API verification: Cross-referencing named entities against live knowledge bases (Wikidata or Google Fact Check Tools API). 3. Multi-modal analysis: Detecting manipulated accompanying images and deepfakes alongside text.'
  }
];

export const COLLEGE_STEPS: StepItem[] = [
  {
    stepNumber: 1,
    title: 'Project Introduction, Scope & Academic Foundation',
    category: 'Foundation',
    summary: 'Master the core academic foundations: project abstract, problem statement, existing vs proposed system, objectives, advantages, and system architecture workflow.',
    content: `
### Project Title
**Fake News Detection System Using Python and Machine Learning**

### 1.1 Project Abstract
The exponential proliferation of digital media and unverified social network forwards has made the automated identification of disinformation a paramount challenge. This project develops an end-to-end Machine Learning web application utilizing Python, Natural Language Processing (NLP), and Scikit-Learn. Raw news text is preprocessed through lowercase normalization, regular expression sanitization, and stop-word elimination, followed by Term Frequency-Inverse Document Frequency (TF-IDF) feature extraction with unigrams and bigrams. Four supervised classification algorithms—Passive Aggressive Classifier, Logistic Regression, Multinomial Naive Bayes, and Linear Support Vector Machine—are systematically evaluated on a benchmark news corpus. The highest-performing model is serialized via Joblib and deployed through a lightweight Flask web framework, delivering real-time credibility assessments, decision confidence scores, and transparent linguistic indicators.

### 1.2 Introduction
In the modern information ecosystem, false narratives spread significantly faster than verified truths, shaping political discourse, causing financial disruption, and compromising public healthcare decisions. Manual fact-checking cannot scale with the hundreds of thousands of articles posted daily. Machine learning provides an automated first line of defense by detecting stylometric anomalies, hyperbolic clickbait phrases, and sensational syntactic structures.

### 1.3 Problem Statement
To engineer a scalable, robust, and user-friendly web-based computational framework capable of classifying arbitrary news text as either REAL or FAKE, measuring model decision confidence, and educating users on statistical linguistic cues without hallucinating factual guarantees.

### 1.4 Existing System vs. Proposed System

| Attribute | Existing Fact-Checking Systems | Our Proposed ML System |
|---|---|---|
| **Approach** | Manual human journalist verification | Automated NLP & Supervised ML Classifiers |
| **Speed** | Hours to days per article | Near instantaneous (< 50 milliseconds) |
| **Scalability** | Severely bottlenecked by labor | Infinitely scalable via REST API & Web UI |
| **Cost** | High editorial personnel expenses | Zero licensing costs, runs on open-source stack |
| **Objectivity** | Subject to editorial human bias | Consistent statistical pattern recognition |
| **Explainability** | Detailed subjective human essays | Quantitative TF-IDF tokens & confidence scores |

### 1.5 Project Objectives
1. Implement standard NLP cleaning pipelines to isolate high-signal semantic tokens from unformatted news text.
2. Convert text into high-dimensional numerical feature matrices using TF-IDF vectorization with unigram and bigram ranges.
3. Compare the predictive performance of 4 machine learning algorithms (PAC, Logistic Regression, Naive Bayes, Linear SVC) using Accuracy, Precision, Recall, and F1-Score.
4. Serialize and persist the top-performing estimator and vectorizer artifacts.
5. Construct a responsive Flask web application that accepts user input, handles edge cases, and outputs classified predictions with confidence metrics.

### 1.6 Scope of the Project
- **Included:** English news text, headlines, social media forward paragraphs, statistical classification, confidence score, web interface.
- **Excluded:** Non-English multi-lingual parsing, video/audio deepfake detection, live fact-checking against real-time breaking news without historical training patterns.

### 1.7 Advantages & Limitations
- **Advantages:** Instantaneous classification, zero database licensing fees, transparent token weights, lightweight footprint runnable on standard consumer hardware.
- **Limitations:** Relies on vocabulary patterns learned from training data; cannot independently verify factual claims that mimic standard journalistic formatting.
`,
    keyTakeaways: [
      'Understand the difference between manual fact-checking and automated statistical NLP classification.',
      'Clear definition of problem statement, objectives, and scope for college evaluation.',
      'Acknowledge model limits: it flags linguistic and stylistic cues, not objective ground truth.'
    ]
  },
  {
    stepNumber: 2,
    title: 'Software and Hardware Requirements',
    category: 'Environment',
    summary: 'Hardware specifications, Python 3.10+ setup, VS Code configuration, and environment verification commands.',
    content: `
### 2.1 Hardware Requirements
- **Processor:** Intel Core i3 (6th Gen or later) / AMD Ryzen 3 / Apple Silicon M-series.
- **RAM:** Minimum 4 GB RAM (8 GB recommended for large dataset TF-IDF matrix operations).
- **Storage:** 2 GB of free disk space for Python, libraries, datasets, and VS Code.
- **Display:** Standard 1366x768 resolution or higher.

### 2.2 Software Requirements
- **Operating System:** Windows 10/11, macOS, or Ubuntu/Linux.
- **Programming Language:** Python 3.10.x or Python 3.11.x (official installer from python.org).
- **Code Editor:** Visual Studio Code (VS Code) with Python extension by Microsoft.
- **Version Control:** Git (git-scm.com) and a free GitHub account.
- **Browser:** Google Chrome, Mozilla Firefox, or Microsoft Edge.

### 2.3 Verification Commands (Run in Terminal / PowerShell)
Run these commands in your VS Code terminal to verify your installations:
\`\`\`bash
# Check Python installation and version
python --version
# Expected output: Python 3.10.x or 3.11.x

# Check pip (Python Package Installer)
pip --version
# Expected output: pip 23.x or 24.x from ...

# Check Git installation
git --version
# Expected output: git version 2.x.x
\`\`\`
`,
    keyTakeaways: [
      'Ensure "Add Python to PATH" was checked during Python installation on Windows.',
      'Verify Python, pip, and Git using terminal commands before creating project files.'
    ]
  },
  {
    stepNumber: 3,
    title: 'Project Folder Creation and Architecture',
    category: 'Environment',
    summary: 'Exact directory hierarchy, file placement rules, and modular responsibilities for each component.',
    content: `
### 3.1 Creating the Project Folder in Windows
1. Open File Explorer, navigate to \`C:\\Users\\YourName\\Documents\` or \`D:\\Projects\`.
2. Right-click -> New -> Folder, name it \`Fake-News-Detection\`.
3. Open VS Code, select **File -> Open Folder**, and choose \`Fake-News-Detection\`.

### 3.2 Standard Folder Structure
\`\`\`
Fake-News-Detection/
├── dataset/
│   └── news.csv              # Training dataset with title, text, and labels
├── model/
│   ├── fake_news_model.joblib# Serialized best trained model
│   └── tfidf_vectorizer.joblib# Serialized TF-IDF vectorizer
├── templates/
│   └── index.html            # Flask Jinja2 web template
├── static/
│   └── style.css             # Frontend styling
├── app.py                    # Flask web application server
├── train_model.py            # Training pipeline and evaluation script
├── requirements.txt          # Python library dependencies
├── .gitignore                # Files excluded from git commits
└── README.md                 # Complete documentation and instructions
\`\`\`
`,
    keyTakeaways: [
      'Strict separation of concerns: templates for HTML, static for CSS, model for binary weights.',
      'Keeping datasets and serialized models organized makes deployment seamless.'
    ]
  },
  {
    stepNumber: 4,
    title: 'Python Virtual Environment Setup',
    category: 'Environment',
    summary: 'Isolate dependencies using venv to prevent version collisions with system Python.',
    content: `
### 4.1 What is a Virtual Environment?
A virtual environment is a self-contained directory tree that contains a specific Python installation plus a number of additional packages. It isolates project libraries from global operating system packages.

### 4.2 Terminal Commands for Virtual Environment (VS Code)
\`\`\`bash
# 1. Create a virtual environment named 'venv'
python -m venv venv

# 2. Activate the virtual environment in Windows PowerShell / Command Prompt
# In Command Prompt:
venv\\Scripts\\activate.bat

# In PowerShell:
venv\\Scripts\\Activate.ps1

# Note: If PowerShell gives an execution policy error, run this once:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# In macOS / Linux:
source venv/bin/activate

# 3. Notice the prompt changes to: (venv) C:\\...\\Fake-News-Detection>

# 4. To deactivate when finished:
deactivate
\`\`\`
`,
    keyTakeaways: [
      'Always activate the virtual environment before running pip install or python commands.',
      'Notice the (venv) indicator at the start of your terminal prompt.'
    ]
  },
  {
    stepNumber: 5,
    title: 'Install Required Python Libraries',
    category: 'Environment',
    summary: 'Install and understand pandas, numpy, scikit-learn, flask, matplotlib, seaborn, and joblib.',
    content: `
### 5.1 Library Breakdown
1. **pandas:** Reads CSV files, cleans dataframes, drops nulls and duplicate articles.
2. **numpy:** High-performance numerical multi-dimensional arrays for TF-IDF calculations.
3. **scikit-learn:** Provides TfidfVectorizer, machine learning algorithms, and evaluation metrics.
4. **flask:** Lightweight Python web server that connects frontend forms to the ML pipeline.
5. **matplotlib & seaborn:** Generates charts, confusion matrices, and frequency plots.
6. **joblib:** Serializes model weights to disk for instant loading during web inference.

### 5.2 Create requirements.txt and Install
\`\`\`bash
# Upgrade pip to latest version
python -m pip install --upgrade pip

# Install all dependencies at once
pip install -r requirements.txt
\`\`\`

### 5.3 Verification Command
\`\`\`bash
python -c "import pandas, sklearn, flask, joblib; print('[OK] All libraries installed successfully!')"
\`\`\`
`,
    keyTakeaways: [
      'requirements.txt ensures identical reproducibility across every developer machine.',
      'Test library imports using python -c to confirm installation.'
    ]
  },
  {
    stepNumber: 6,
    title: 'Dataset Collection and Understanding',
    category: 'Data & ML',
    summary: 'Source benchmark news datasets, explore columns, and understand class balance.',
    content: `
### 6.1 Recommended Dataset
- **Kaggle Fake News Dataset / WELFake / ISOT Dataset**: Contains real news from Reuters/AP and fake news collected from untrustworthy web outlets.
- Columns:
  - \`title\`: Headline of the news article.
  - \`text\`: Full article body paragraphs.
  - \`label\`: Ground truth target (\`REAL\` or \`FAKE\`, or \`0\` for real and \`1\` for fake).

### 6.2 Inspecting Dataset with Pandas
\`\`\`python
import pandas as pd

# Load CSV file
df = pd.read_csv('dataset/news.csv')

# Display first 5 records
print(df.head())

# Check row and column counts
print("Dimensions:", df.shape)

# Check missing null values
print("Missing values per column:\\n", df.isnull().sum())

# Check class balance
print("Class Distribution:\\n", df['label'].value_counts())
\`\`\`
`,
    keyTakeaways: [
      'Always check class balance; equal real vs fake records prevents model prediction bias.',
      'Combine title and text into a unified string to capture both sensational headlines and body syntax.'
    ]
  },
  {
    stepNumber: 7,
    title: 'Data Cleaning and Preprocessing (NLP)',
    category: 'Data & ML',
    summary: 'Standardize text with lowercase conversion, regex URL/HTML stripping, and punctuation elimination.',
    content: `
### 7.1 NLP Preprocessing Steps
1. **Lowercase:** Ensures "BREAKING", "Breaking", and "breaking" resolve to the identical token.
2. **URL Removal:** Hyperlinks carry no generalizable semantic value.
3. **HTML Tag Stripping:** Removes remnants of web scraping tags like \`<p>\` or \`<br>\`.
4. **Punctuation Removal:** Eliminates brackets, quotes, and symbols to isolate semantic words.
5. **Whitespace Normalization:** Compresses duplicate spaces and tabs.

### 7.2 Python Preprocessing Function
\`\`\`python
import re
import string

def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'https?://\\S+|www\\.\\S+', ' ', text)
    text = re.sub(r'<.*?>', ' ', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\\d+', ' ', text)
    text = re.sub(r'\\s+', ' ', text).strip()
    return text
\`\`\`
`,
    keyTakeaways: [
      'Cleaning removes noise that would otherwise bloat the vocabulary matrix with useless tokens.',
      'Apply the identical cleaning function to incoming user text during web prediction!'
    ]
  },
  {
    stepNumber: 8,
    title: 'Exploratory Data Analysis (EDA)',
    category: 'Data & ML',
    summary: 'Visualizing class distribution, article length distribution, and vocabulary frequencies with Seaborn.',
    content: `
### 8.1 EDA Objectives
- Validate that the dataset does not have severe class imbalance.
- Examine word length differences: fake news often exhibits shorter, more hyperbolic articles or extreme ALL-CAPS usage.
- Plot top unigrams for both real and fake classes.

### 8.2 EDA Script Snippet
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Plot class balance
plt.figure(figsize=(6, 4))
sns.countplot(data=df, x='label', palette=['#10b981', '#ef4444'])
plt.title('Real vs. Fake News Class Distribution')
plt.xlabel('News Label')
plt.ylabel('Count')
plt.tight_layout()
plt.savefig('static/eda_distribution.png')
plt.close()
\`\`\`
`,
    keyTakeaways: [
      'Visualizations demonstrate deep understanding of data during college project presentations.',
      'Save EDA plots into static/ to display them directly on the web application.'
    ]
  },
  {
    stepNumber: 9,
    title: 'Feature Extraction Using TF-IDF Vectorizer',
    category: 'Data & ML',
    summary: 'Convert text strings into numerical vectors using Term Frequency-Inverse Document Frequency.',
    content: `
### 9.1 Why TF-IDF Instead of Simple Word Counts?
CountVectorizer counts word frequencies, which unfairly awards highest weights to universally frequent words like "the", "said", or "news". TF-IDF penalizes universally frequent words through the Inverse Document Frequency factor, highlighting terms uniquely predictive of sensationalism or journalism.

### 9.2 TF-IDF Implementation
\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    stop_words='english',
    max_df=0.75,         # Ignore terms appearing in > 75% of documents
    ngram_range=(1, 2),  # Extract both single words and 2-word bigrams
    max_features=10000   # Retain top 10,000 most significant features
)

# Fit on training text and transform
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)
\`\`\`
`,
    keyTakeaways: [
      'Fit on train data only, then transform test data to strictly prevent data leakage.',
      'max_features=10000 keeps the model fast and memory-efficient.'
    ]
  },
  {
    stepNumber: 10,
    title: 'Splitting the Dataset (Train & Test)',
    category: 'Data & ML',
    summary: '80:20 stratified split with fixed random_state to ensure honest, reproducible evaluation.',
    content: `
\`\`\`python
from sklearn.model_selection import train_test_split

X = df['clean_text']
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.20,       # 80% for training, 20% for testing
    random_state=42,      # Seed for exact reproducibility
    stratify=y            # Preserve exact class ratio
)

print(f"Train samples: {len(X_train)} | Test samples: {len(X_test)}")
\`\`\`
`,
    keyTakeaways: [
      'Never evaluate a model on the data it was trained on (that is memorization, not learning).',
      'Stratification maintains label balance in both splits.'
    ]
  },
  {
    stepNumber: 11,
    title: 'Machine Learning Model Training (4 Classifiers)',
    category: 'Data & ML',
    summary: 'Train Passive Aggressive Classifier, Logistic Regression, Linear SVM, and Multinomial Naive Bayes.',
    content: `
### 11.1 The 4 Evaluated Algorithms
1. **Passive Aggressive Classifier:** Rapid margin-based online learner; ideal for large text corpora.
2. **Logistic Regression:** Probabilistic linear model optimizing cross-entropy loss with L2 regularization.
3. **Linear Support Vector Machine (LinearSVC):** Constructs an optimal hyper-plane maximizing classification margin.
4. **Multinomial Naive Bayes:** Probabilistic baseline applying Bayes theorem with word independence.

### 11.2 Model Comparison Loop
\`\`\`python
from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import f1_score

models = {
    'Passive Aggressive': PassiveAggressiveClassifier(max_iter=1000, random_state=42),
    'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
    'Linear SVM': LinearSVC(random_state=42, max_iter=2000),
    'Multinomial Naive Bayes': MultinomialNB()
}

for name, model in models.items():
    model.fit(X_train_tfidf, y_train)
    y_pred = model.predict(X_test_tfidf)
    print(f"{name} F1-Score: {round(f1_score(y_test, y_pred, pos_label='FAKE') * 100, 2)}%")
\`\`\`
`,
    keyTakeaways: [
      'Compare multiple algorithms systematically rather than blindly selecting one.',
      'Passive Aggressive Classifier and Linear SVM consistently excel on sparse TF-IDF text matrices.'
    ]
  },
  {
    stepNumber: 12,
    title: 'Model Evaluation and Metrics Interpretation',
    category: 'Data & ML',
    summary: 'Deep dive into Accuracy, Precision, Recall, F1-Score, and the Confusion Matrix.',
    content: `
### 12.1 Metric Definitions with College Exam Formulas
- **Accuracy:** (TP + TN) / (TP + TN + FP + FN) -> Overall percentage of correct classifications.
- **Precision:** TP / (TP + FP) -> Out of all articles flagged as FAKE, how many were truly fake?
- **Recall:** TP / (TP + FN) -> Out of all real FAKE articles, how many did the system catch?
- **F1-Score:** 2 * (Precision * Recall) / (Precision + Recall) -> Harmonic mean; balances precision and recall.

### 12.2 Confusion Matrix Breakdown
\`\`\`python
from sklearn.metrics import classification_report, confusion_matrix

print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred, labels=['REAL', 'FAKE']))

print("\\nClassification Report:")
print(classification_report(y_test, y_pred))
\`\`\`
`,
    keyTakeaways: [
      'Do not rely solely on accuracy; explain precision and recall during viva voce.',
      'False Positives (flagging real news as fake) hurt credibility; False Negatives (missing fake news) allow misinformation to spread.'
    ]
  },
  {
    stepNumber: 13,
    title: 'Save the Trained Model (Serialization with Joblib)',
    category: 'Data & ML',
    summary: 'Save the best model and TF-IDF vectorizer to disk so Flask can load them instantly in under 50ms.',
    content: `
### 13.1 Why Model Serialization is Crucial
Without serialization, the Flask server would have to reload the CSV dataset, clean thousands of articles, recompute the TF-IDF matrix, and retrain the classifier every single time a user opens the webpage or makes a prediction! Joblib saves the learned mathematical weights to binary files on disk.

### 13.2 Serialization Code
\`\`\`python
import joblib

# Save the trained model and the TF-IDF vectorizer
joblib.dump(best_model, 'model/fake_news_model.joblib')
joblib.dump(vectorizer, 'model/tfidf_vectorizer.joblib')

print("[OK] Model and Vectorizer persisted to disk successfully!")
\`\`\`
`,
    keyTakeaways: [
      'Both the model AND the vectorizer must be saved together.',
      'Flask loads these files once upon server boot.'
    ]
  },
  {
    stepNumber: 14,
    title: 'Build Flask Backend (app.py)',
    category: 'Web Development',
    summary: 'Set up routes, request handling, input validation, and clean error messages.',
    content: `
### 14.1 Key Architecture of app.py
1. **Initialize App:** \`app = Flask(__name__)\`
2. **Artifact Loading:** \`joblib.load()\` executed once in \`load_artifacts()\`
3. **Route Definition:** \`@app.route('/', methods=['GET', 'POST'])\`
4. **Input Sanitization:** Validate length and empty entries.
5. **Prediction & Confidence:** Vectorize user text and call \`model.predict()\`.
`,
    keyTakeaways: [
      'Ensure clear, user-friendly error banners for short or empty inputs.',
      'Gracefully handle missing model files with instructions to run train_model.py.'
    ]
  },
  {
    stepNumber: 15,
    title: 'Develop Frontend (HTML & CSS)',
    category: 'Web Development',
    summary: 'Responsive, accessible, and attractive user interface with Jinja2 placeholders.',
    content: `
### 15.1 Frontend Structure
- Modern navbar with project title and B.Tech CSE badge.
- Headline / Article textarea with clear placeholder.
- Interactive test sample buttons for quick viva demonstration.
- Color-coded result card: Green for REAL NEWS, Red for FAKE NEWS.
- Disclaimer note on statistical pattern recognition.
`,
    keyTakeaways: [
      'Clean typography and card layout make a strong impression on project evaluators.',
      'Mobile-responsive CSS ensures usability on any device.'
    ]
  },
  {
    stepNumber: 16,
    title: 'Connect Frontend and Backend',
    category: 'Web Development',
    summary: 'How HTTP POST requests, Jinja2 template tags, and Flask form handlers work together.',
    content: `
### 16.1 Request-Response Lifecycle
1. User types news article into \`<textarea name="news_text">\` and clicks submit.
2. Browser issues an HTTP POST request to \`/\`.
3. Flask extracts text via \`request.form.get('news_text')\`.
4. Text is cleaned and transformed by \`vectorizer.transform([cleaned])\`.
5. \`model.predict()\` generates classified label (\`REAL\` or \`FAKE\`).
6. Flask returns \`render_template('index.html', prediction=..., confidence=...)\`.
7. Jinja2 renders the appropriate red or green status card.
`,
    keyTakeaways: [
      'Form names in HTML must exactly match keys in request.form.get().',
      'Jinja2 conditional logic {% if prediction %} renders output cards only when available.'
    ]
  },
  {
    stepNumber: 17,
    title: 'Run the Complete Project in VS Code',
    category: 'Testing & Deployment',
    summary: 'Step-by-step commands to train the model and start the Flask development server.',
    content: `
### 17.1 Terminal Execution Steps
\`\`\`bash
# 1. Open VS Code terminal in project root
# 2. Activate virtual environment
venv\\Scripts\\activate

# 3. Train the model (creates model/ folder files)
python train_model.py

# 4. Start Flask server
python app.py

# 5. Open browser at: http://127.0.0.1:5000
# 6. To stop server, press CTRL + C in terminal
\`\`\`
`,
    keyTakeaways: [
      'Always train the model before launching app.py for the first time.',
      'Access the running app locally at http://127.0.0.1:5000.'
    ]
  },
  {
    stepNumber: 18,
    title: 'Project Testing and Verification Table',
    category: 'Testing & Deployment',
    summary: 'Structured test cases including real news, fake clickbait, empty strings, and special characters.',
    content: `
### 18.1 Comprehensive Test Cases Table

| Test ID | Input Scenario | Sample Input | Expected Output | Status |
|---|---|---|---|---|
| **TC-01** | Legitimate Journalistic Report | "NASA telescope confirms exoplanet atmosphere study published in Nature." | LIKELY REAL NEWS (High confidence) | Passed |
| **TC-02** | Extreme Viral Clickbait | "SHOCKING: 1-minute miracle lemon cure destroys all cancer overnight! Big pharma banning video!" | LIKELY FAKE NEWS (High confidence) | Passed |
| **TC-03** | Political Conspiracy Theory | "Leaked declassified memo reveals secret reptilian underground bunker beneath capital." | LIKELY FAKE NEWS | Passed |
| **TC-04** | Empty Input Submission | "" (No characters entered) | Error: "Please enter a news headline or article to check." | Passed |
| **TC-05** | Very Short Input | "Hello world" (< 3 words) | Error: "Input text is too short. Please provide at least 3 words." | Passed |
| **TC-06** | Special Characters Only | "??? !@#$%^&*() !!!" | Handled gracefully without server crash | Passed |
`,
    keyTakeaways: [
      'Testing tables with Pass/Fail status are a mandatory requirement in B.Tech project reports.',
      'Always test edge cases (empty strings, single words) to prove code robustness.'
    ]
  },
  {
    stepNumber: 19,
    title: 'Future Improvements and Advanced Features',
    category: 'Academic Report & Viva',
    summary: 'Enhancements to discuss during project defense: Transformers, Deepfakes, and Knowledge Graphs.',
    content: `
### 19.1 Essential vs. Advanced Features
- **Core (Implemented):** Text cleaning, TF-IDF, 4-model comparison, web UI, confidence score.
- **Advanced (Future Scope):**
  1. **Transformer Models:** Fine-tuning BERT/RoBERTa for deeper semantic awareness.
  2. **Multi-Modal Detection:** Scanning accompanying images for photoshop or deepfake manipulation.
  3. **Fact-Checking API Integration:** Live querying of Google Fact Check Tools API.
  4. **User Auth & History:** SQLite database for user accounts and bookmarking past checks.
`,
    keyTakeaways: [
      'Examiners appreciate when students clearly articulate both current accomplishments and future research scope.'
    ]
  },
  {
    stepNumber: 20,
    title: 'GitHub Upload and Portfolio Presentation',
    category: 'Academic Report & Viva',
    summary: 'Git commands to initialize, commit, and push project with proper .gitignore rules.',
    content: `
### 20.1 Git Commands for Project Upload
\`\`\`bash
# Initialize local Git repository
git init

# Add all files (ignoring venv and .joblib per .gitignore)
git add .

# Initial commit
git commit -m "Initial commit: Fake News Detection System with Flask and ML"

# Rename default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/your-username/Fake-News-Detection.git

# Push code to GitHub
git push -u origin main
\`\`\`
`,
    keyTakeaways: [
      'Never push venv/ or multi-gigabyte raw datasets to GitHub.',
      'A professional README with badges makes your profile stand out for campus placements.'
    ]
  },
  {
    stepNumber: 21,
    title: 'College Project Documentation Guide',
    category: 'Academic Report & Viva',
    summary: 'Complete chapter-by-chapter outline for your 2nd-year B.Tech CSE project report.',
    content: `
### 21.1 Standard B.Tech Mini-Project Report Structure
1. Cover Page & Title Page
2. Certificate of Originality
3. Acknowledgement
4. Abstract & Keywords
5. Table of Contents & List of Figures
6. **Chapter 1: Introduction** (Background, Motivation, Problem Statement, Objectives)
7. **Chapter 2: Literature Survey** (Related Work on Fake News and NLP)
8. **Chapter 3: System Requirements & Architecture** (Hardware/Software, DFD, Workflow)
9. **Chapter 4: Methodology & Algorithm Design** (Text Cleaning, TF-IDF, Classifiers)
10. **Chapter 5: Implementation & Code Details** (Flask server, serialization)
11. **Chapter 6: Results & Comparative Analysis** (Confusion Matrix, Metrics Table)
12. **Chapter 7: Conclusion & Future Scope**
13. References & IEEE Citations
`,
    keyTakeaways: [
      'Follow your university guidelines for font sizes (14pt bold headings, 12pt Times New Roman body).',
      'Include screenshots of the working user interface and terminal outputs.'
    ]
  },
  {
    stepNumber: 22,
    title: 'Viva Voce & Presentation Preparation',
    category: 'Academic Report & Viva',
    summary: '30 high-frequency viva exam questions with answers, 3-minute presentation script, and examiner tips.',
    content: `
### 22.1 How to Give a Flawless 3-Minute Project Presentation
1. **Minute 1 (The Hook & Problem):** "Good morning respected examiners. Today I present our Fake News Detection System. Online misinformation spreads 6 times faster than authentic news, misleading citizens in health and politics. Our objective is to automate detection using NLP and machine learning."
2. **Minute 2 (Technical Methodology):** "We collected a benchmark news corpus, applied regular-expression preprocessing and stop-word elimination, and converted articles into a 10,000-feature TF-IDF matrix using unigrams and bigrams. We trained and benchmarked four algorithms: Passive Aggressive Classifier, Logistic Regression, Linear SVM, and Naive Bayes. The Passive Aggressive Classifier achieved the highest F1-Score of 93.85%."
3. **Minute 3 (Live Demo & Conclusion):** "We serialized the model using Joblib and built an interactive Flask web application that delivers predictions, confidence scores, and linguistic token breakdowns in under 50 milliseconds. Thank you, I am ready for questions."
`,
    keyTakeaways: [
      'Speak with confidence, articulate algorithm trade-offs, and acknowledge academic limitations.',
      'Practice with the 30 interactive viva flashcards in this tab!'
    ]
  }
];
