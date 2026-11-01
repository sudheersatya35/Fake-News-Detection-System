export interface StepItem {
  stepNumber: number;
  title: string;
  category: 'Foundation' | 'System Architecture' | 'Machine Learning' | 'Data Pipeline' | 'Testing & Evaluation' | 'Academic Report & Viva';
  summary: string;
  content: string;
  keyTakeaways: string[];
}

export interface VivaQuestion {
  id: number;
  category: 'Machine Learning' | 'NLP & Text' | 'System Design' | 'Evaluation';
  question: string;
  answer: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  // Machine Learning Concepts
  {
    id: 1,
    category: 'Machine Learning',
    question: 'What is Supervised Learning and how does this project use it?',
    answer: 'Supervised Learning is a category of machine learning where the model is trained using input samples paired with verified ground-truth labels. In our system, the input consists of news texts, and the labels are "REAL" or "FAKE". The algorithm identifies patterns and decision boundaries that separate the two classes.'
  },
  {
    id: 2,
    category: 'Machine Learning',
    question: 'How does the Passive Aggressive Classifier work conceptually?',
    answer: 'The Passive Aggressive Classifier is a margin-based classification algorithm. It remains "Passive" when an incoming text sample is correctly classified within a safe margin, making zero changes to its internal parameters. However, whenever a classification error occurs, it becomes "Aggressive" and updates its weights to correct the mistake. This makes it extremely fast and well-suited for high-dimensional text data.'
  },
  {
    id: 3,
    category: 'Machine Learning',
    question: 'What is the decision boundary in linear classification algorithms?',
    answer: 'A decision boundary is a mathematical hyperplane separating two classes in feature space. In our project, text is converted into multi-dimensional numerical points. The classifier determines which side of the separating boundary an article falls on: one side corresponds to Real news, and the other to Fake news.'
  },
  {
    id: 4,
    category: 'Machine Learning',
    question: 'Why do we split the dataset into 80% training and 20% testing sets?',
    answer: 'Data splitting prevents model memorization (data leakage). Training on 80% teaches the model general linguistic patterns, while holding out 20% as an unseen test set provides an unbiased, honest measure of how well the system will perform on new, unseen news articles.'
  },
  {
    id: 5,
    category: 'Machine Learning',
    question: 'What is Stratified Splitting and why is it essential?',
    answer: 'Stratified splitting ensures that the training set and testing set have the exact same percentage distribution of Real and Fake articles as the original dataset. Without stratification, a random split could accidentally put too many fake articles in the test set, skewing evaluation results.'
  },
  {
    id: 6,
    category: 'Machine Learning',
    question: 'How does Logistic Regression classify news articles?',
    answer: 'Logistic Regression calculates a weighted sum of all extracted feature indicators and passes that score through an S-shaped Sigmoid function. This converts the linear score into an interpretable probability between 0 and 1. A threshold (typically 0.5) is then applied to classify the article as Real or Fake.'
  },
  {
    id: 7,
    category: 'Machine Learning',
    question: 'What is Linear Support Vector Machine (Linear SVM)?',
    answer: 'Linear SVM is an algorithm that searches for the optimal separating hyperplane that maximizes the geometric distance (margin) between the nearest Real news samples and nearest Fake news samples. Maximizing this margin provides strong generalization performance on high-dimensional text matrices.'
  },
  {
    id: 8,
    category: 'Machine Learning',
    question: 'What is the core assumption in Multinomial Naive Bayes?',
    answer: 'Naive Bayes applies probability theory under the "naive" assumption that every word in a document appears independently of every other word, given the class. While words in human language are naturally correlated, this probabilistic approach provides a fast, effective baseline for text categorization.'
  },
  {
    id: 9,
    category: 'Machine Learning',
    question: 'What is Overfitting and how do we prevent it?',
    answer: 'Overfitting occurs when a machine learning model memorizes trivial noise or coincidental phrases from the training set rather than learning true generalizable rules. We mitigate overfitting by removing common stopwords, setting minimum and maximum document frequency thresholds, and utilizing regularization penalties.'
  },
  {
    id: 10,
    category: 'Machine Learning',
    question: 'Does this machine learning system independently verify real-world facts?',
    answer: 'No. The system evaluates linguistic style, sensational lexical cues, syntactic structure, and statistical word correlations learned from training data. It flags stylistic markers of misinformation but does not perform live database or web fact-checking.'
  },

  // NLP & Text Concepts
  {
    id: 11,
    category: 'NLP & Text',
    question: 'What is Natural Language Processing (NLP)?',
    answer: 'Natural Language Processing is the interdisciplinary field of computer science and artificial intelligence focused on enabling computers to understand, interpret, process, and extract meaningful patterns from human language text.'
  },
  {
    id: 12,
    category: 'NLP & Text',
    question: 'What is TF-IDF and what does it represent?',
    answer: 'TF-IDF stands for Term Frequency-Inverse Document Frequency. Term Frequency (TF) measures how often a word appears inside a single article. Inverse Document Frequency (IDF) penalizes words that appear everywhere across all articles (like "said" or "news"). Multiplying TF by IDF assigns the highest mathematical weights to words that are uniquely descriptive of that specific document.'
  },
  {
    id: 13,
    category: 'NLP & Text',
    question: 'What is the difference between Count Vectorization and TF-IDF?',
    answer: 'Count Vectorization simply counts raw word occurrences, which unfairly gives the highest scores to common filler words. TF-IDF balances frequency with rarity across the entire collection, filtering out universal noise and highlighting distinctive discriminative words.'
  },
  {
    id: 14,
    category: 'NLP & Text',
    question: 'What are Stopwords and why do we remove them?',
    answer: 'Stopwords are extremely common grammatical words such as "the", "is", "at", "which", and "on". They carry little to no topical or discriminative sentiment for distinguishing between real and fake news, so removing them reduces noise and speeds up processing.'
  },
  {
    id: 15,
    category: 'NLP & Text',
    question: 'What are N-grams and why do we use both Unigrams and Bigrams?',
    answer: 'An N-gram is a continuous sequence of N words. A unigram is a single word ("miracle"), while a bigram is a pair of consecutive words ("miracle cure" or "official statement"). Using both unigrams and bigrams captures multi-word phrases that carry far clearer credibility signals than individual words alone.'
  },
  {
    id: 16,
    category: 'NLP & Text',
    question: 'Why do we convert all text to lowercase during preprocessing?',
    answer: 'Converting text to lowercase ensures that identical words with different capitalizations (such as "BREAKING", "Breaking", and "breaking") are treated as the same token, preventing unnecessary duplication in the vocabulary.'
  },
  {
    id: 17,
    category: 'NLP & Text',
    question: 'Why do we clean URLs and HTML markup from incoming news?',
    answer: 'Web links, website domains, and HTML formatting tags (like <p> or <br>) represent artifacts of internet publishing and web scraping. They do not represent journalistic syntax and would only introduce irrelevant noise into the feature matrix.'
  },
  {
    id: 18,
    category: 'NLP & Text',
    question: 'Why did we combine the news headline and body text before processing?',
    answer: 'Headlines contain emotional triggers, clickbait framing, and urgent hooks, while body paragraphs provide journalistic syntax and attribution density. Analyzing both together gives the system the full spectrum of linguistic signals.'
  },

  // Evaluation & Metrics
  {
    id: 19,
    category: 'Evaluation',
    question: 'What is a Confusion Matrix and what are its four outcomes?',
    answer: 'A Confusion Matrix is a 2x2 grid comparing actual labels against predicted labels: 1) True Positive (TP): Fake news correctly caught as Fake. 2) True Negative (TN): Real news correctly identified as Real. 3) False Positive (FP / Type I Error): Real news mistakenly flagged as Fake. 4) False Negative (FN / Type II Error): Fake news mistakenly accepted as Real.'
  },
  {
    id: 20,
    category: 'Evaluation',
    question: 'What is Precision and why does it matter in news moderation?',
    answer: 'Precision is the ratio of correctly identified fake articles to all articles flagged as fake: TP / (TP + FP). High precision ensures the system rarely misidentifies legitimate journalism as fake, preserving user trust and freedom of expression.'
  },
  {
    id: 21,
    category: 'Evaluation',
    question: 'What is Recall and why does it matter in misinformation defense?',
    answer: 'Recall is the ratio of correctly caught fake articles to all actual fake articles in the dataset: TP / (TP + FN). High recall ensures that widespread dangerous hoaxes and scams do not slip through undetected.'
  },
  {
    id: 22,
    category: 'Evaluation',
    question: 'What is the F1-Score and why is it preferred over Accuracy?',
    answer: 'The F1-Score is the harmonic mean of Precision and Recall: 2 * (Precision * Recall) / (Precision + Recall). While Accuracy can be misleading on imbalanced data, F1-Score gives an honest, balanced measure of overall classification reliability.'
  },
  {
    id: 23,
    category: 'Evaluation',
    question: 'What is the consequence of a Type I error (False Positive) in our application?',
    answer: 'A Type I error occurs when authentic news is wrongly labeled as Fake. This damages publisher credibility and can lead to unnecessary censorship of factual information.'
  },
  {
    id: 24,
    category: 'Evaluation',
    question: 'What is the consequence of a Type II error (False Negative) in our application?',
    answer: 'A Type II error occurs when deceptive news slips past the filter and is labeled as Real. This allows viral misinformation, health scams, or malicious rumors to mislead readers.'
  },

  // System Design & Architecture
  {
    id: 25,
    category: 'System Design',
    question: 'What is Model Serialization and why is it necessary?',
    answer: 'Model serialization is the process of saving trained mathematical weights and vectorizer vocabularies into persistent storage files. Without serialization, the server would have to re-read thousands of training articles and retrain the model on every single user request, causing unacceptable delays.'
  },
  {
    id: 26,
    category: 'System Design',
    question: 'Explain the 3-Tier Architecture of this web application.',
    answer: 'The architecture consists of: 1) Presentation Layer: Clean web user interface for entering headlines and viewing colored result cards. 2) Application & Processing Layer: Handles form validation, text cleaning, and vectorization. 3) Machine Learning Inference Layer: Executes the trained classifier and calculates confidence scores.'
  },
  {
    id: 27,
    category: 'System Design',
    question: 'How does the system handle empty inputs or invalid submissions?',
    answer: 'Input validation guards the processing pipeline. If the user submits an empty box or text under 3 words, the system intercepts the request and displays a clear advisory alert, preventing crashes and meaningless calculations.'
  },
  {
    id: 28,
    category: 'System Design',
    question: 'Why is a Decision Confidence Score provided alongside the label?',
    answer: 'A binary label ("Real" or "Fake") does not reveal how certain the model is. A confidence score (such as 94.2%) indicates whether the text strongly matches known patterns or falls close to the ambiguous decision boundary.'
  },
  {
    id: 29,
    category: 'System Design',
    question: 'What are the main ethical responsibilities of building a news detection tool?',
    answer: 'The system must operate with complete transparency. It should provide disclaimers stating that predictions are based on stylistic training patterns, present confidence scores clearly, and serve as an assistive advisor rather than an authoritarian censor.'
  },
  {
    id: 30,
    category: 'System Design',
    question: 'What are three promising future architectural upgrades for this project?',
    answer: '1) Contextual Transformers: Incorporating models like BERT or RoBERTa for nuanced semantic understanding. 2) Knowledge Graph Integration: Checking claims against structured knowledge bases like Wikidata. 3) Multi-Modal Forensics: Analyzing accompanying photos to detect digital tampering.'
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
**Fake News Detection System Using Machine Learning**

### 1.1 Project Abstract
The exponential proliferation of digital media and unverified social network forwards has made the automated identification of disinformation a paramount challenge. This project develops an end-to-end Machine Learning web application utilizing Natural Language Processing (NLP). Raw news text is preprocessed through lowercase normalization, regular expression sanitization, and stop-word elimination, followed by Term Frequency-Inverse Document Frequency (TF-IDF) feature extraction with unigrams and bigrams. Four supervised classification algorithms—Passive Aggressive Classifier, Logistic Regression, Multinomial Naive Bayes, and Linear Support Vector Machine—are systematically evaluated on a benchmark news corpus. The highest-performing model is serialized and deployed through a lightweight web framework, delivering real-time credibility assessments, decision confidence scores, and transparent linguistic indicators.

### 1.2 Introduction
In the modern information ecosystem, false narratives spread significantly faster than verified truths, shaping political discourse, causing financial disruption, and compromising public healthcare decisions. Manual fact-checking cannot scale with the hundreds of thousands of articles posted daily. Machine learning provides an automated first line of defense by detecting stylometric anomalies, hyperbolic clickbait phrases, and sensational syntactic structures.

### 1.3 Problem Statement
To engineer a scalable, robust, and user-friendly web-based computational framework capable of classifying arbitrary news text as either REAL or FAKE, measuring model decision confidence, and educating users on statistical linguistic cues without hallucinating factual guarantees.

### 1.4 Existing System vs. Proposed System
- **Existing System (Manual Human Fact-Checking):** Slow (takes hours to days), high labor costs, susceptible to human fatigue, and cannot keep up with millions of viral daily posts.
- **Proposed System (Machine Learning Classifier):** Operates in milliseconds, zero marginal cost per check, scalable via web interface, and provides objective pattern scoring.

### 1.5 Project Objectives
1. Implement standard NLP cleaning pipelines to isolate high-signal semantic tokens from unformatted news text.
2. Convert text into high-dimensional numerical feature matrices using TF-IDF vectorization with unigram and bigram ranges.
3. Compare the predictive performance of 4 machine learning algorithms using Accuracy, Precision, Recall, and F1-Score.
4. Persist the top-performing estimator and vectorizer artifacts for rapid inference.
5. Construct a responsive web application that accepts user input, handles edge cases, and outputs classified predictions with confidence metrics.
`,
    keyTakeaways: [
      'Understand the difference between manual fact-checking and automated statistical NLP classification.',
      'Clear definition of problem statement, objectives, and scope for college evaluation.',
      'Acknowledge model limits: it flags linguistic and stylistic cues, not objective ground truth.'
    ]
  },
  {
    stepNumber: 2,
    title: 'System and Hardware Requirements (Pure Concepts & Specifications)',
    category: 'System Architecture',
    summary: 'Hardware specifications, operating system compatibility, architecture layers, and functional dependencies explained conceptually.',
    content: `
### 2.1 Hardware Requirements
- **Processor:** Dual-core or Quad-core modern processor (Intel Core i3/i5, AMD Ryzen, or equivalent).
- **RAM:** Minimum 4 GB RAM (8 GB recommended for holding high-dimensional TF-IDF matrices in memory during model evaluation).
- **Storage:** 2 GB of free disk space for housing datasets, serialized model parameters, and web assets.
- **Display:** Standard 1366x768 resolution or higher with web browser support.

### 2.2 Software Environment & Architecture Layers
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Presentation Layer:** Modern web browser (Chrome, Edge, Firefox, Safari) displaying responsive HTML5 and CSS3 user interfaces.
- **Web Application Server Layer:** Lightweight HTTP request-response dispatcher that accepts submitted text and manages session states.
- **Data Preprocessing & NLP Layer:** String sanitization, symbol stripping, and stopword filtering pipeline.
- **Machine Learning Inference Engine:** High-dimensional vector space transformer and margin-based linear classification estimator.
`,
    keyTakeaways: [
      'The architecture requires minimal hardware; standard student laptops can easily train and host the model.',
      'The separation of concerns between presentation, processing, and inference ensures clean system design.'
    ]
  },
  {
    stepNumber: 3,
    title: 'Project Folder Structure & Modular Responsibilities',
    category: 'System Architecture',
    summary: 'Logical directory hierarchy, separation of concerns, and responsibilities of each component.',
    content: `
### 3.1 Logical Directory Organization
A robust machine learning software project organizes files according to clear operational boundaries:
1. **Dataset Repository:** Dedicated storage for raw and cleaned benchmark news records.
2. **Model Persistence Vault:** Secure directory holding pre-trained serialized model weights and feature vocabulary mappings.
3. **User Interface Templates:** Web presentation views containing input boxes, status cards, and layout elements.
4. **Visual Style Assets:** CSS stylesheets controlling color themes, elevations, responsive grids, and typography.
5. **Inference Server Controller:** Coordinates incoming user requests, invokes the NLP pipeline, and returns predictions.
6. **Training & Benchmarking Pipeline:** Handles end-to-end dataset loading, 80:20 splitting, multi-algorithm evaluation, and artifact saving.
7. **Documentation & Version Exclusions:** Comprehensive README guide and version control exclusion rules.
`,
    keyTakeaways: [
      'Clean modularity separates static presentation, machine learning artifacts, and data storage.',
      'Enables independent updates: model retraining does not disrupt the web layout.'
    ]
  },
  {
    stepNumber: 4,
    title: 'Isolated Execution Environments',
    category: 'System Architecture',
    summary: 'Why modern software relies on isolated environments to ensure reproducibility across machines.',
    content: `
### 4.1 Concept of an Isolated Environment
In modern software engineering, an isolated environment is a dedicated directory sandbox containing its own runtime binaries and library collections. 

### 4.2 Why Isolation is Essential:
1. **Dependency Protection:** Prevents different projects from requiring conflicting library versions.
2. **Reproducibility:** Guarantees that any college examiner, peer, or recruiter running the project will obtain identical behavior.
3. **Clean Uninstallation:** Eliminating the project folder completely cleans all installed components without affecting the host operating system.
`,
    keyTakeaways: [
      'Isolation protects your system from package conflicts.',
      'Ensures consistent execution across college lab computers and presentation laptops.'
    ]
  },
  {
    stepNumber: 5,
    title: 'Required Computational Modules & Libraries',
    category: 'System Architecture',
    summary: 'Conceptual overview of data manipulation, mathematical computing, NLP, and web serving components.',
    content: `
### 5.1 Role of Each Core Component
1. **Tabular Data Processor:** Loads news datasets from CSV storage, handles missing fields, and eliminates duplicate entries.
2. **High-Performance Numerical Array Engine:** Manages multi-dimensional matrix operations for vector math.
3. **Machine Learning & NLP Framework:** Implements TF-IDF vectorization, train-test splitting, classification algorithms, and metric calculations.
4. **Web Server Dispatcher:** Receives HTTP form submissions from users and renders dynamic web pages.
5. **Data Visualization Suite:** Plots exploratory data graphs, class balance bar charts, and confusion matrices.
6. **Model Serialization Engine:** Efficiently packages mathematical matrices and vocabularies into binary storage on disk.
`,
    keyTakeaways: [
      'Each component handles one distinct responsibility in the pipeline.',
      'Together, they form a cohesive data-to-prediction ecosystem.'
    ]
  },
  {
    stepNumber: 6,
    title: 'Dataset Collection, Features & Data Understanding',
    category: 'Data Pipeline',
    summary: 'Anatomy of benchmark news datasets, attributes, class distributions, and data integrity checks.',
    content: `
### 6.1 Benchmark News Corpora
Reliable datasets (such as Kaggle Fake and Real News, WELFake, or the ISOT corpus) contain thousands of articles collected from verified wire agencies (e.g., Reuters, Associated Press) alongside unverified articles from flagged blogs and social channels.

### 6.2 Primary Data Attributes
- **Title (Headline):** The headline of the news story (often contains high-potency clickbait hooks or formal journalistic topic summaries).
- **Text (Body):** The full body text of the article containing claims, arguments, citations, or rumors.
- **Label (Target Variable):** The verified ground-truth designation: **REAL** or **FAKE**.

### 6.3 Data Quality & Integrity Checks
- **Class Balance Analysis:** Ensuring an approximately 50:50 ratio of Real to Fake articles to prevent classifier bias.
- **Missing Value Handling:** Removing empty records or records lacking ground truth labels.
- **Duplicate De-duplication:** Dropping duplicate articles to prevent artificial inflation of accuracy during testing.
`,
    keyTakeaways: [
      'A balanced dataset prevents the model from developing a bias toward either class.',
      'Combining headline and body text provides both sensationalism cues and syntactic evidence.'
    ]
  },
  {
    stepNumber: 7,
    title: 'Data Cleaning and Natural Language Processing (NLP)',
    category: 'Data Pipeline',
    summary: 'How text is normalized, filtered, and transformed from raw prose into clean semantic tokens.',
    content: `
### 7.1 The NLP Preprocessing Pipeline
1. **Case Normalization:** Standardizing all characters to lowercase so that word representations are case-insensitive.
2. **URL & Hyperlink Removal:** Web links contain arbitrary domain strings that offer no generalizable semantic value.
3. **Markup & HTML Stripping:** Erasing web formatting tags left behind by article scraping.
4. **Punctuation & Numerical Filtering:** Isolating pure vocabulary words and stripping distracting non-alphabetical characters.
5. **Stop-word Removal:** Dropping universally frequent grammatical glue words ("the", "is", "at", "by") that carry zero discriminative signal.
`,
    keyTakeaways: [
      'Garbage in, garbage out: thorough cleaning isolates high-signal vocabulary.',
      'The exact same preprocessing steps must be applied to user queries during live web testing.'
    ]
  },
  {
    stepNumber: 8,
    title: 'Exploratory Data Analysis (EDA)',
    category: 'Data Pipeline',
    summary: 'Visualizing patterns, article lengths, class balances, and vocabulary frequencies.',
    content: `
### 8.1 Key Insights from EDA
1. **Class Balance:** Validating that real and fake articles are evenly represented.
2. **Length Distributions:** Fake news articles frequently exhibit shorter body lengths accompanied by sensational, exaggerated headlines.
3. **Punctuation & Capitalization Tendencies:** Misleading articles show higher frequencies of exclamation marks and capitalized words.
4. **Vocabulary Signatures:** Genuine journalism frequently features institutional attribution markers ("according to", "spokesperson", "published in"), whereas clickbait features emotional urgency ("shocking", "miracle", "banned").
`,
    keyTakeaways: [
      'EDA uncovers the statistical patterns that machine learning algorithms later exploit.',
      'Visual graphs provide compelling evidence during project evaluations.'
    ]
  },
  {
    stepNumber: 9,
    title: 'Feature Extraction Using TF-IDF Vectorization',
    category: 'Machine Learning',
    summary: 'How words are converted into mathematical vectors using Term Frequency and Inverse Document Frequency.',
    content: `
### 9.1 Mathematical Intuition of TF-IDF
Computers cannot directly read words; they can only process numbers and matrices. 
- **Term Frequency (TF):** Measures how frequently a word appears inside a given article.
- **Inverse Document Frequency (IDF):** Calculates the logarithm of the total number of documents divided by how many documents contain that word.
- **TF-IDF Score:** Words that appear frequently in a specific article, but rarely across the general news corpus, receive the highest scores.

### 9.2 Vocabulary Range & N-Grams
By including both unigrams (single words) and bigrams (word pairs), the vectorizer captures phrases like "miracle cure" or "official statement", providing critical context that isolated words lack.
`,
    keyTakeaways: [
      'TF-IDF converts text into high-dimensional numerical coordinates in vector space.',
      'Bigrams capture essential contextual phrases.'
    ]
  },
  {
    stepNumber: 10,
    title: 'Dataset Partitioning & Generalization Strategy',
    category: 'Machine Learning',
    summary: 'The rationale behind 80:20 training/test splits and stratified sampling.',
    content: `
### 10.1 Why Data Splitting is Mandatory
Evaluating a machine learning model on the same data it was trained on only proves it has memorized the data. True learning is measured by testing the model on unseen data.

### 10.2 The 80:20 Stratified Partition
- **80% Training Set:** Used by the algorithms to calculate weights, margins, and decision boundaries.
- **20% Testing Set:** Completely hidden during training; used strictly as an honest exam to evaluate real-world performance.
- **Stratification:** Preserves equal proportions of Real and Fake news in both splits.
`,
    keyTakeaways: [
      'Never evaluate a model on its training data.',
      'Stratification prevents sampling bias.'
    ]
  },
  {
    stepNumber: 11,
    title: 'Machine Learning Algorithm Benchmarking',
    category: 'Machine Learning',
    summary: 'Conceptual comparison of Passive Aggressive Classifier, Logistic Regression, Linear SVM, and Naive Bayes.',
    content: `
### 11.1 The Four Evaluated Algorithms
1. **Passive Aggressive Classifier (PAC):** An online, margin-based algorithm that updates parameters only when a mistake occurs. It excels with large, sparse text representations and offers rapid training.
2. **Logistic Regression:** A probabilistic linear model that outputs calibrated confidence probabilities using the sigmoid curve.
3. **Linear Support Vector Machine (LinearSVC):** Maximizes the margin between Real and Fake news feature vectors, providing robust resistance against overfitting.
4. **Multinomial Naive Bayes:** A fast probabilistic baseline applying Bayes Theorem with the assumption of word independence.

### 11.2 Empirical Selection
Rather than assuming one algorithm is universally best, we benchmark all four on the exact same test dataset and select the top performer based on F1-Score.
`,
    keyTakeaways: [
      'Comparing multiple models demonstrates rigorous scientific methodology in your project report.',
      'Passive Aggressive Classifier and Linear SVM consistently lead in high-dimensional text classification.'
    ]
  },
  {
    stepNumber: 12,
    title: 'Model Evaluation Metrics & Confusion Matrix',
    category: 'Testing & Evaluation',
    summary: 'Deep dive into Accuracy, Precision, Recall, F1-Score, and the 2x2 Confusion Matrix.',
    content: `
### 12.1 Understanding Evaluation Metrics
- **Accuracy:** The overall percentage of correct predictions out of all test samples.
- **Precision:** Of all articles flagged as Fake, how many were truly fake? (Minimizes false alarms on real news).
- **Recall:** Of all actual fake articles, how many did the system catch? (Minimizes missed misinformation).
- **F1-Score:** The harmonic mean of Precision and Recall, providing a balanced, single-number assessment.

### 12.2 Confusion Matrix Anatomy
- **True Real (TN):** Genuine news correctly identified.
- **False Fake (FP / Type I Error):** Genuine news mistakenly flagged as fake.
- **False Real (FN / Type II Error):** Fake news mistakenly accepted as real.
- **True Fake (TP):** Fake news correctly caught.
`,
    keyTakeaways: [
      'Accuracy alone is insufficient; Precision, Recall, and F1-Score tell the complete story.',
      'Balancing Type I and Type II errors is vital for user trust.'
    ]
  },
  {
    stepNumber: 13,
    title: 'Model Serialization & Operational Persistence',
    category: 'System Architecture',
    summary: 'Saving trained models to disk so the web server can perform instant predictions.',
    content: `
### 13.1 The Need for Serialization
Without saving the trained model to disk, every web visitor would trigger a complete dataset re-load, text pre-processing pass, and model retraining process. This would take minutes per request.

### 13.2 Saved Artifacts
1. **Trained Estimator File:** Stores the numerical weights and decision hyperplane.
2. **TF-IDF Vectorizer File:** Stores the 10,000-word vocabulary index and inverse document frequency weights.
`,
    keyTakeaways: [
      'Serialization enables sub-50ms web predictions.',
      'Both the vectorizer and the classifier must be saved as a matching pair.'
    ]
  },
  {
    stepNumber: 14,
    title: 'Web Application Server Architecture',
    category: 'System Architecture',
    summary: 'How the backend web controller routes requests, validates input, and invokes the ML engine.',
    content: `
### 14.1 Backend Controller Workflow
1. **Startup:** Loads the serialized model and vectorizer once into memory upon server launch.
2. **Route Handling:** Serves the main webpage when users visit the site.
3. **Form Submission:** Receives the headline and article text submitted by the user.
4. **Validation:** Checks that the input is non-empty and contains at least 3 words.
5. **Inference Execution:** Passes the text through the NLP cleaning pipeline and classifier.
6. **Response Delivery:** Returns the predicted class, decision score, and confidence percentage.
`,
    keyTakeaways: [
      'Loading artifacts at startup ensures rapid user response times.',
      'Robust input validation prevents server crashes.'
    ]
  },
  {
    stepNumber: 15,
    title: 'User Interface Design & Usability',
    category: 'System Architecture',
    summary: 'Creating a modern, accessible, and intuitive front-end interface.',
    content: `
### 15.1 Core UI Components
- **Clear News Input Area:** Generous text area for pasting articles with clear guidance.
- **One-Click Test Samples:** Pre-loaded real and fake examples for easy classroom demonstrations.
- **Distinct Visual Verdicts:** Unambiguous status indicators (Green for Real, Red for Fake).
- **Confidence Gauge:** Visual progress bar communicating model certainty.
- **Transparent Linguistic Cues:** Badges showing matched sensational vs. attribution terms.
- **Academic Disclaimer:** Prominently explains that predictions reflect statistical patterns, not absolute factual truth.
`,
    keyTakeaways: [
      'A polished user interface makes a strong impression during college project evaluations.',
      'Visual cues make machine learning decisions transparent and understandable.'
    ]
  },
  {
    stepNumber: 16,
    title: 'End-to-End Data Flow Integration',
    category: 'System Architecture',
    summary: 'How user input travels through the web layer, NLP pipeline, ML model, and back to the browser.',
    content: `
### 16.1 The 5-Stage Data Journey
1. **User Input Stage:** Text entered into browser form.
2. **Transport Stage:** HTTP request sends data to the application server.
3. **NLP Transformation Stage:** Text is cleaned, lowercased, and converted to a TF-IDF vector.
4. **Decision Stage:** The classifier computes the hyperplane margin and class probability.
5. **Presentation Stage:** The browser displays a color-coded credibility card.
`,
    keyTakeaways: [
      'Seamless integration connects the front-end user experience to back-end ML math.',
      'The entire cycle executes in less than 50 milliseconds.'
    ]
  },
  {
    stepNumber: 17,
    title: 'Deployment & Execution Verification',
    category: 'Testing & Evaluation',
    summary: 'Verifying end-to-end functionality, local hosting, and error resolution.',
    content: `
### 17.1 Verification Checklist
1. Ensure the training pipeline completes with zero unhandled exceptions.
2. Verify that both model files exist in the model directory.
3. Confirm the web server launches and binds to the designated local port.
4. Test access in multiple web browsers to verify responsive styling.
`,
    keyTakeaways: [
      'Always test your full system before presenting to evaluators.',
      'Keep backup screenshots in your presentation slides.'
    ]
  },
  {
    stepNumber: 18,
    title: 'Structured Testing & Edge Case Scenarios',
    category: 'Testing & Evaluation',
    summary: 'Testing boundary conditions, special characters, and typical news samples.',
    content: `
### 18.1 Key Test Scenarios
- **Legitimate News Test:** Verified wire agency articles should consistently classify as Real.
- **Sensational Clickbait Test:** Exaggerated medical cures and conspiracy theories should classify as Fake.
- **Empty Input Test:** Blank submissions must trigger helpful error banners without crashing.
- **Short Input Test:** Single words or fragments should advise the user to provide more context.
- **Special Character Test:** Input containing only symbols must be sanitized gracefully.
`,
    keyTakeaways: [
      'A structured test suite demonstrates software engineering maturity.',
      'Graceful edge-case handling proves system robustness.'
    ]
  },
  {
    stepNumber: 19,
    title: 'System Enhancements & Future Research Scope',
    category: 'Academic Report & Viva',
    summary: 'Discussing advanced directions: deep neural networks, fact-checking APIs, and multi-modal analysis.',
    content: `
### 19.1 Promising Future Directions
1. **Deep Contextual Transformers (BERT / RoBERTa):** Capturing subtle sarcasm, irony, and complex narrative flow.
2. **Knowledge Graph Fact-Checking:** Linking claims to structured knowledge repositories like Wikidata.
3. **Multi-Modal Forensics:** Analyzing images and thumbnails for signs of digital manipulation or deepfakes.
4. **Source Credibility Graphs:** Factoring in the historical reputation of the publishing domain.
`,
    keyTakeaways: [
      'Demonstrating awareness of future improvements impresses viva examiners.',
      'Shows that you understand the boundary between current ML capabilities and ongoing research.'
    ]
  },
  {
    stepNumber: 20,
    title: 'Project Versioning & Portfolio Presentation',
    category: 'Academic Report & Viva',
    summary: 'Presenting your project cleanly with architecture diagrams, clear documentation, and proper exclusions.',
    content: `
### 20.1 Professional Project Presentation Standards
1. **Clear System Overview:** What problem does it solve, and how does the ML pipeline work?
2. **Architecture Diagrams:** High-level block diagrams illustrating the data journey.
3. **Exclusion of Transient Files:** Keeping compiled binaries and temporary caches out of documentation.
4. **Live Demonstrations:** Having ready-to-test examples for reviewers.
`,
    keyTakeaways: [
      'A clean presentation highlights your engineering mindset.',
      'Well-structured documentation is a core requirement for university grading.'
    ]
  },
  {
    stepNumber: 21,
    title: 'Academic Mini-Project Report Preparation',
    category: 'Academic Report & Viva',
    summary: 'Standard university formatting, required chapters, certificates, and diagrams.',
    content: `
### 21.1 Core Chapters for University Submission
- **Cover Page & Bonafide Certificate**
- **Abstract & Keywords**
- **Chapter 1: Introduction & Problem Statement**
- **Chapter 2: Literature Survey & Related Work**
- **Chapter 3: System Architecture & Requirements**
- **Chapter 4: Methodology (NLP, TF-IDF, Classifiers)**
- **Chapter 5: Implementation & Testing Results**
- **Chapter 6: Conclusion, Limitations & Future Scope**
- **References (IEEE Format)**
`,
    keyTakeaways: [
      'Follow your university guidelines for structure, margins, and typography.',
      'Use the Project Report tab in this workbench to generate a complete draft.'
    ]
  },
  {
    stepNumber: 22,
    title: 'Viva Voce & Oral Defense Preparation',
    category: 'Academic Report & Viva',
    summary: 'Strategies for answering evaluator questions, delivering a 3-minute project summary, and defending results.',
    content: `
### 22.1 The 3-Minute Elevator Pitch Formula
1. **Minute 1 - The Problem:** Misinformation spreads rapidly online, causing harm in health and politics. Manual fact-checking cannot scale, creating the need for automated NLP tools.
2. **Minute 2 - The Methodology:** We cleaned a benchmark news corpus, extracted TF-IDF unigrams and bigrams, and trained 4 classifiers. The Passive Aggressive Classifier achieved the best balance with a 93.85% F1-score.
3. **Minute 3 - The Demonstration & Defense:** We deployed the model via an interactive web interface with confidence scores and transparent linguistic markers.
`,
    keyTakeaways: [
      'Speak with confidence, articulate algorithm trade-offs, and acknowledge academic boundaries.',
      'Practice with the 30 interactive viva flashcards in this tab.'
    ]
  }
];
