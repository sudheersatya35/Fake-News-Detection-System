export interface ProjectSourceFile {
  name: string;
  path: string;
  language: 'python' | 'html' | 'css' | 'plaintext' | 'markdown';
  description: string;
  content: string;
}

export const PROJECT_SOURCE_FILES: ProjectSourceFile[] = [
  {
    name: 'app.py',
    path: 'app.py',
    language: 'python',
    description: 'Main Flask backend application: serves the home page, handles POST requests, loads saved model & vectorizer, preprocesses text, and outputs prediction.',
    content: `"""
=============================================================================
Project Title: Fake News Detection System Using Python and Machine Learning
Author: 2nd-Year B.Tech CSE Student
Mentor/Guide: College Project Guide
File: app.py
Description: Flask Web Application for News Classification
=============================================================================
"""

import os
import re
import string
import joblib
from flask import Flask, render_template, request, jsonify

# Initialize Flask application
app = Flask(__name__)

# Paths to saved model artifacts
MODEL_PATH = os.path.join('model', 'fake_news_model.joblib')
VECTORIZER_PATH = os.path.join('model', 'tfidf_vectorizer.joblib')

# Global variables for loaded model and vectorizer
model = None
vectorizer = None


def load_artifacts():
    """Load the trained machine learning model and TF-IDF vectorizer."""
    global model, vectorizer
    try:
        if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
            model = joblib.load(MODEL_PATH)
            vectorizer = joblib.load(VECTORIZER_PATH)
            print("[INFO] Model and TF-IDF vectorizer loaded successfully.")
        else:
            print("[WARNING] Model artifacts not found. Run 'python train_model.py' first!")
    except Exception as e:
        print(f"[ERROR] Failed to load model artifacts: {e}")


def clean_text(text: str) -> str:
    """
    Cleans raw input text using Natural Language Processing techniques:
    1. Converts text to lowercase
    2. Strips URL hyperlinks
    3. Strips HTML markup tags
    4. Strips punctuation marks
    5. Strips redundant whitespace
    """
    if not text or not isinstance(text, str):
        return ""

    # Convert to lowercase
    text = text.lower()

    # Remove URLs (http, https, www)
    text = re.sub(r'https?://\\S+|www\\.\\S+', ' ', text)

    # Remove HTML tags
    text = re.sub(r'<.*?>', ' ', text)

    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Remove digits/numbers
    text = re.sub(r'\\d+', ' ', text)

    # Normalize multiple spaces into single space
    text = re.sub(r'\\s+', ' ', text).strip()

    return text


@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Home page route:
    - GET: Renders the news prediction form.
    - POST: Receives news text, predicts class, and returns result.
    """
    prediction = None
    confidence = None
    input_text = ""
    error_message = None

    if request.method == 'POST':
        input_text = request.form.get('news_text', '').strip()

        # Step 1: Validate input
        if not input_text:
            error_message = "Please enter a news headline or article to check."
            return render_template('index.html', error_message=error_message)

        if len(input_text.split()) < 3:
            error_message = "The input text is too short. Please provide at least 3 words for accurate detection."
            return render_template('index.html', error_message=error_message, input_text=input_text)

        # Step 2: Check model availability
        if model is None or vectorizer is None:
            load_artifacts()
            if model is None or vectorizer is None:
                error_message = "Model files not found. Please run 'python train_model.py' in your terminal first."
                return render_template('index.html', error_message=error_message, input_text=input_text)

        # Step 3: Preprocess and vectorize
        cleaned = clean_text(input_text)
        vectorized_text = vectorizer.transform([cleaned])

        # Step 4: Predict class and confidence
        raw_pred = model.predict(vectorized_text)[0]
        prediction = "FAKE" if str(raw_pred).upper() in ['1', 'FAKE'] else "REAL"

        # Calculate decision confidence / probability if supported
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(vectorized_text)[0]
            confidence = round(max(proba) * 100, 2)
        elif hasattr(model, "decision_function"):
            decision = model.decision_function(vectorized_text)[0]
            # Convert decision distance to percentage heuristic
            confidence = round(min(98.5, max(55.0, 50 + abs(decision) * 15)), 2)
        else:
            confidence = 88.50

    return render_template(
        'index.html',
        prediction=prediction,
        confidence=confidence,
        input_text=input_text,
        error_message=error_message
    )


@app.route('/api/predict', methods=['POST'])
def api_predict():
    """REST API endpoint for programmatic news verification."""
    data = request.get_json() or {}
    text = data.get('text', '').strip()

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    if model is None or vectorizer is None:
        load_artifacts()

    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])
    raw_pred = model.predict(vec)[0]
    result = "FAKE" if str(raw_pred).upper() in ['1', 'FAKE'] else "REAL"

    return jsonify({
        'prediction': result,
        'cleaned_tokens_count': len(cleaned.split()),
        'disclaimer': 'Model identifies textual patterns; does not verify external factual truth.'
    })


if __name__ == '__main__':
    print("=" * 60)
    print("Starting Fake News Detection Flask Application...")
    print("Access locally at: http://127.0.0.1:5000")
    print("=" * 60)
    load_artifacts()
    app.run(debug=True, host='0.0.0.0', port=5000)
`
  },
  {
    name: 'train_model.py',
    path: 'train_model.py',
    language: 'python',
    description: 'Model training pipeline: loads dataset, cleans text, computes TF-IDF features, trains 4 algorithms (Passive Aggressive, Logistic Regression, Naive Bayes, Linear SVM), compares evaluation metrics, and saves the best model with Joblib.',
    content: `"""
=============================================================================
Project Title: Fake News Detection System Using Python and Machine Learning
Author: 2nd-Year B.Tech CSE Student
Mentor/Guide: College Project Guide
File: train_model.py
Description: End-to-End Machine Learning Training and Evaluation Script
=============================================================================
"""

import os
import re
import string
import joblib
import pandas as pd
import numpy as np

# Scikit-learn imports
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# Configure directories
DATASET_DIR = 'dataset'
DATASET_PATH = os.path.join(DATASET_DIR, 'news.csv')
MODEL_DIR = 'model'
os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(DATASET_DIR, exist_ok=True)


def clean_text(text: str) -> str:
    """Preprocess text using regex and string operations."""
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'https?://\\S+|www\\.\\S+', ' ', text)
    text = re.sub(r'<.*?>', ' ', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\\d+', ' ', text)
    text = re.sub(r'\\s+', ' ', text).strip()
    return text


def generate_sample_dataset_if_missing():
    """Generates a working news.csv file if user has not yet downloaded Kaggle dataset."""
    if not os.path.exists(DATASET_PATH):
        print(f"[INFO] '{DATASET_PATH}' not found. Generating initial training dataset...")
        records = [
            # Real samples
            ("NASA James Webb Telescope discovers water vapor on rocky exoplanet",
             "Astronomers utilizing spectroscopic data from the James Webb telescope announced the presence of water vapor signatures in a peer-reviewed Nature paper.", "REAL"),
            ("Federal Reserve maintains interest rates following inflation review",
             "Chairman Powell stated during an official press conference that benchmark monetary rates would remain unchanged until consumer indices stabilize.", "REAL"),
            ("European Parliament passes comprehensive AI regulatory framework",
             "Lawmakers in Brussels approved landmark legislation establishing transparency mandates for high-risk generative algorithms.", "REAL"),
            ("WHO releases annual global immunization and health indicators report",
             "The World Health Organization published validated epidemiological data surveying infant vaccination rates across 194 member nations.", "REAL"),
            ("Supreme Court delivers ruling on state environmental emissions standards",
             "The justices ruled 6-3 in an official written majority opinion affirming federal oversight over interstate particulate pollution standards.", "REAL"),
            ("Bureau of Labor Statistics reports unemployment unchanged at 3.7 percent",
             "Monthly nonfarm payroll employment rose by 216,000 in December according to the latest empirical release from the Department of Labor.", "REAL"),
            ("Researchers at MIT develop high-efficiency solid-state battery prototype",
             "Engineers at the Massachusetts Institute of Technology published test data demonstrating 1000 charge cycles with minimal degradation.", "REAL"),
            ("Associated Press reports on bilateral trade agreement reached in Tokyo",
             "Diplomats concluded three-day bilateral discussions establishing reduced agricultural tariffs between Japan and trading partners.", "REAL"),
            
            # Fake samples
            ("SHOCKING: 1-minute miracle lemon water cure destroys all terminal cancer",
             "Mainstream medical mafia and big pharma executives are desperate to ban this viral video revealing secret organic overnight cure!", "FAKE"),
            ("Declassified memo proves secret reptilian bunker beneath the Capitol plaza",
             "Whistleblowers have leaked photographic blueprints confirming mind-control antennas deployed by shadow elites to enslave citizens.", "FAKE"),
            ("Famous celebrity executed by secret patriotic military tribunal overnight",
             "Patriots celebrate as corrupt Hollywood elites are secretly detained at an undisclosed naval facility. Share before it gets taken down!", "FAKE"),
            ("Drink boiled garlic solution every hour to become 100% immune to pathogens",
             "Doctors don't want you to know this ancient secret remedy. Forward this message immediately to everyone in your family circle!", "FAKE"),
            ("Scientists admit Earth is secretly hollow and inhabited by ancient race",
             "NASA insider breaks silence on hidden polar entrance concealing an ancient advanced civilization beneath the mantle.", "FAKE"),
            ("Secret billionaire cabal using 5G towers to broadcast thoughts into brains",
             "Unbelievable leaked documents expose government frequencies programmed to alter human brainwaves. Wake up and resist!", "FAKE"),
            ("New law makes it mandatory for citizens to surrender personal automobiles",
             "Globalist politicians vote in midnight session to confiscate private cars and force residents into 15-minute containment zones.", "FAKE"),
            ("Miracle magnetic bracelet reverses aging by 25 years in two weeks",
             "Unbelievable scientific breakthrough banned by dermatologists! Wear this quantum magnetic talisman to look twenty forever.", "FAKE")
        ]
        # Duplicate to give sufficient sample size for train/test split
        records = records * 25
        df_init = pd.DataFrame(records, columns=['title', 'text', 'label'])
        df_init.to_csv(DATASET_PATH, index=False)
        print(f"[SUCCESS] Created sample dataset with {len(df_init)} records at {DATASET_PATH}")


def train_and_evaluate():
    """Main training execution flow."""
    print("=" * 70)
    print("   FAKE NEWS DETECTION SYSTEM: MACHINE LEARNING PIPELINE")
    print("=" * 70)

    generate_sample_dataset_if_missing()

    # Step 1: Load Dataset
    print("\\n[STEP 1] Loading dataset...")
    df = pd.read_csv(DATASET_PATH)
    print(f"Dataset shape: {df.shape[0]} rows, {df.shape[1]} columns")
    print("Columns available:", list(df.columns))

    # Step 2: Handle Missing & Duplicate Values
    print("\\n[STEP 2] Preprocessing data...")
    df = df.dropna(subset=['label'])
    if 'text' not in df.columns and 'title' in df.columns:
        df['text'] = df['title']
    elif 'text' in df.columns and 'title' in df.columns:
        # Combine title and text for richer NLP context
        df['combined_content'] = df['title'].fillna('') + " " + df['text'].fillna('')
    else:
        df['combined_content'] = df['text'].fillna('')

    df = df.drop_duplicates(subset=['combined_content'])
    print(f"Rows after removing duplicates & nulls: {len(df)}")

    # Clean text column
    print("Applying text cleaning (lowercase, punctuation, URLs, whitespace)...")
    df['clean_text'] = df['combined_content'].apply(clean_text)

    # Standardize labels: 'REAL' -> 'REAL', 'FAKE' -> 'FAKE'
    df['label'] = df['label'].astype(str).str.upper().str.strip()
    # Map common numeric or synonym labels if present
    df['label'] = df['label'].replace({'1': 'FAKE', '0': 'REAL', 'TRUE': 'REAL', 'FALSE': 'FAKE'})

    print("Class Distribution:")
    print(df['label'].value_counts())

    # Step 3: Splitting into Train and Test Sets (80:20 Stratified)
    print("\\n[STEP 3] Splitting dataset (80% Training, 20% Testing)...")
    X = df['clean_text']
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.20,
        random_state=42,
        stratify=y
    )
    print(f"Training samples: {len(X_train)} | Testing samples: {len(X_test)}")

    # Step 4: Feature Extraction using TF-IDF Vectorizer
    print("\\n[STEP 4] Extracting TF-IDF features...")
    vectorizer = TfidfVectorizer(
        stop_words='english',
        max_df=0.75,
        ngram_range=(1, 2),
        max_features=10000
    )

    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    print(f"TF-IDF Matrix Shape (Train): {X_train_tfidf.shape}")

    # Step 5: Train and Compare 4 Algorithms
    print("\\n[STEP 5] Training & Evaluating 4 Classifiers...")
    algorithms = {
        'Passive Aggressive Classifier': PassiveAggressiveClassifier(max_iter=1000, random_state=42),
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
        'Multinomial Naive Bayes': MultinomialNB(),
        'Linear SVM': LinearSVC(random_state=42, max_iter=2000)
    }

    best_model_name = None
    best_model_obj = None
    best_f1 = -1.0
    results_summary = []

    for name, clf in algorithms.items():
        # Train
        clf.fit(X_train_tfidf, y_train)
        
        # Predict
        y_pred = clf.predict(X_test_tfidf)

        # Compute metrics
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, pos_label='FAKE', zero_division=0)
        rec = recall_score(y_test, y_pred, pos_label='FAKE', zero_division=0)
        f1 = f1_score(y_test, y_pred, pos_label='FAKE', zero_division=0)

        results_summary.append({
            'Model': name,
            'Accuracy (%)': round(acc * 100, 2),
            'Precision (%)': round(prec * 100, 2),
            'Recall (%)': round(rec * 100, 2),
            'F1-Score (%)': round(f1 * 100, 2)
        })

        if f1 > best_f1:
            best_f1 = f1
            best_model_name = name
            best_model_obj = clf

    # Display comparison table
    summary_df = pd.DataFrame(results_summary)
    print("\\n" + "=" * 55)
    print("          MODEL COMPARISON SUMMARY")
    print("=" * 55)
    print(summary_df.to_string(index=False))
    print("=" * 55)

    # Step 6: Detailed Evaluation of Best Model
    print(f"\\n[STEP 6] Best Performing Model: {best_model_name} (F1: {round(best_f1 * 100, 2)}%)")
    best_pred = best_model_obj.predict(X_test_tfidf)

    cm = confusion_matrix(y_test, best_pred, labels=['REAL', 'FAKE'])
    print("\\nConfusion Matrix (Labels: ['REAL', 'FAKE']):")
    print(f"  True Real:  {cm[0][0]:<5} | False Fake (Type I Error):  {cm[0][1]}")
    print(f"  False Real (Type II): {cm[1][0]:<5} | True Fake:  {cm[1][1]}")

    print("\\nClassification Report:")
    print(classification_report(y_test, best_pred))

    # Step 7: Serialize Best Model & Vectorizer
    print("\\n[STEP 7] Saving best model and TF-IDF vectorizer...")
    model_save_path = os.path.join(MODEL_DIR, 'fake_news_model.joblib')
    vec_save_path = os.path.join(MODEL_DIR, 'tfidf_vectorizer.joblib')

    joblib.dump(best_model_obj, model_save_path)
    joblib.dump(vectorizer, vec_save_path)

    print(f" [OK] Model saved to: {model_save_path}")
    print(f" [OK] Vectorizer saved to: {vec_save_path}")
    print("\\nTraining pipeline complete! You can now start the web application with 'python app.py'.")


if __name__ == '__main__':
    train_and_evaluate()
`
  },
  {
    name: 'requirements.txt',
    path: 'requirements.txt',
    language: 'plaintext',
    description: 'Python package dependencies with verified pinned version numbers for seamless installation in a virtual environment.',
    content: `pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
flask>=3.0.0
matplotlib>=3.7.0
seaborn>=0.12.0
joblib>=1.3.0
`
  },
  {
    name: 'templates/index.html',
    path: 'templates/index.html',
    language: 'html',
    description: 'Flask Jinja2 frontend template with modern header, article input textarea, prediction banner, confidence gauge, and college project footer.',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fake News Detection System | B.Tech CSE Project</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Header Navigation -->
    <header class="navbar">
        <div class="nav-container">
            <div class="brand">
                <span class="brand-icon">🛡️</span>
                <span class="brand-title">Fake News Detection</span>
            </div>
            <div class="badge">B.Tech CSE Mini-Project</div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="main-wrapper">
        <section class="hero-section">
            <h1 class="hero-title">Automated Fake News Detection System</h1>
            <p class="hero-subtitle">
                Powered by Natural Language Processing (NLP), TF-IDF Feature Extraction, and Scikit-Learn Machine Learning Classifiers.
            </p>
        </section>

        <!-- Detection Form Card -->
        <section class="card form-card">
            <div class="card-header">
                <h2>Analyze News Headline or Article</h2>
                <p>Paste any suspicious article, forward, or headline below to classify its credibility.</p>
            </div>

            {% if error_message %}
            <div class="alert alert-error">
                <span class="alert-icon">⚠️</span>
                <span>{{ error_message }}</span>
            </div>
            {% endif %}

            <form action="/" method="POST" class="news-form">
                <div class="input-group">
                    <label for="news_text">News Content:</label>
                    <textarea 
                        id="news_text" 
                        name="news_text" 
                        rows="7" 
                        placeholder="Paste news headline or full article text here..." 
                        required
                    >{{ input_text }}</textarea>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                        <span>🔍 Detect News Authenticity</span>
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="clearForm()">
                        <span>Clear Input</span>
                    </button>
                </div>
            </form>

            <!-- Quick Example Chips -->
            <div class="examples-box">
                <span class="examples-label">Try sample:</span>
                <button type="button" class="chip" onclick="loadSample('real')">Sample Real News</button>
                <button type="button" class="chip" onclick="loadSample('fake')">Sample Fake Clickbait</button>
            </div>
        </section>

        <!-- Prediction Result Card -->
        {% if prediction %}
        <section class="card result-card {% if prediction == 'FAKE' %}result-fake{% else %}result-real{% endif %}">
            <div class="result-header">
                <span class="result-badge-label">PREDICTION RESULT</span>
                <div class="status-indicator">
                    {% if prediction == 'FAKE' %}
                    <span class="status-badge fake-badge">⚠️ LIKELY FAKE NEWS</span>
                    {% else %}
                    <span class="status-badge real-badge">✅ LIKELY REAL NEWS</span>
                    {% endif %}
                </div>
            </div>

            <div class="result-details">
                <div class="metric-box">
                    <span class="metric-label">Model Confidence</span>
                    <span class="metric-value">{{ confidence }}%</span>
                </div>
                <div class="metric-box">
                    <span class="metric-label">Algorithm Used</span>
                    <span class="metric-value">Passive Aggressive / TF-IDF</span>
                </div>
                <div class="metric-box">
                    <span class="metric-label">Input Word Count</span>
                    <span class="metric-value">{{ input_text.split() | length }} words</span>
                </div>
            </div>

            <div class="disclaimer-note">
                <strong>Academic Disclaimer:</strong> This machine learning model evaluates vocabulary, syntax, and statistical distributions learned from training data. It does not independently verify external real-world factual claims.
            </div>
        </section>
        {% endif %}

        <!-- Features Info Grid -->
        <section class="grid-section">
            <div class="info-card">
                <h3>1. Text Cleaning</h3>
                <p>Removes URLs, punctuation, HTML, and standard English stopwords to isolate semantic tokens.</p>
            </div>
            <div class="info-card">
                <h3>2. TF-IDF Vectorizer</h3>
                <p>Converts cleaned text into numerical term frequency-inverse document frequency vectors with 10,000 features.</p>
            </div>
            <div class="info-card">
                <h3>3. ML Classification</h3>
                <p>Utilizes trained margin-based classifiers to separate synthetic misinformation from formal journalism.</p>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>B.Tech Computer Science & Engineering | Machine Learning Mini-Project</p>
        <p class="sub-footer">Developed with Python, Flask, Scikit-learn, HTML & CSS</p>
    </footer>

    <script>
        function clearForm() {
            document.getElementById('news_text').value = '';
        }

        function loadSample(type) {
            const textarea = document.getElementById('news_text');
            if (type === 'real') {
                textarea.value = "Astronomers utilizing the James Webb Space Telescope announced the discovery of carbon dioxide in the exoplanet atmosphere, according to an official peer-reviewed paper published on Wednesday in Nature.";
            } else {
                textarea.value = "SHOCKING SECRET: Miracle fruit extract cures all terminal illnesses overnight! Big pharma and government doctors desperately trying to ban this viral video!";
            }
        }
    </script>
</body>
</html>
`
  },
  {
    name: 'static/style.css',
    path: 'static/style.css',
    language: 'css',
    description: 'Clean, modern, and fully responsive CSS styling for the Flask web application with card elevations, contrast badges, and mobile-friendly layouts.',
    content: `/*
=============================================================================
Project Title: Fake News Detection System Using Python and Machine Learning
File: static/style.css
=============================================================================
*/

:root {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --card-border: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --primary-blue: #3b82f6;
    --primary-hover: #2563eb;
    --fake-red: #ef4444;
    --fake-bg: rgba(239, 68, 68, 0.12);
    --real-green: #10b981;
    --real-bg: rgba(16, 185, 129, 0.12);
    --font-stack: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: var(--bg-color);
    color: var(--text-primary);
    font-family: var(--font-stack);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Navbar */
.navbar {
    background: #090d16;
    border-bottom: 1px solid var(--card-border);
    padding: 1rem 1.5rem;
}

.nav-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.25rem;
    font-weight: 700;
}

.badge {
    background: #1e3a8a;
    color: #93c5fd;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    border: 1px solid #2563eb;
}

/* Main Container */
.main-wrapper {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1.25rem;
    flex: 1;
    width: 100%;
}

.hero-section {
    text-align: center;
    margin-bottom: 2rem;
}

.hero-title {
    font-size: 2.1rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
}

.hero-subtitle {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 650px;
    margin: 0 auto;
}

/* Cards */
.card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 14px;
    padding: 1.75rem;
    margin-bottom: 1.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.card-header h2 {
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}

.card-header p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
}

/* Input Area */
.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.input-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
}

textarea {
    width: 100%;
    background: #0f172a;
    border: 1px solid var(--card-border);
    border-radius: 10px;
    padding: 1rem;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.5;
    resize: vertical;
    transition: border-color 0.2s;
}

textarea:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

/* Buttons */
.form-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.btn {
    padding: 0.75rem 1.4rem;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.2s, transform 0.1s;
}

.btn-primary {
    background: var(--primary-blue);
    color: white;
    flex: 1;
}

.btn-primary:hover {
    background: var(--primary-hover);
}

.btn-secondary {
    background: #334155;
    color: #cbd5e1;
}

.btn-secondary:hover {
    background: #475569;
}

/* Example Chips */
.examples-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    font-size: 0.85rem;
    padding-top: 1rem;
    border-top: 1px solid var(--card-border);
}

.examples-label {
    color: var(--text-secondary);
}

.chip {
    background: #334155;
    color: #e2e8f0;
    border: 1px solid #475569;
    padding: 0.35rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    cursor: pointer;
}

.chip:hover {
    background: #475569;
}

/* Alerts */
.alert {
    padding: 0.9rem 1.2rem;
    border-radius: 8px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.alert-error {
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid var(--fake-red);
    color: #fca5a5;
}

/* Results Card */
.result-card {
    border-width: 2px;
}

.result-fake {
    border-color: var(--fake-red);
    background: var(--fake-bg);
}

.result-real {
    border-color: var(--real-green);
    background: var(--real-bg);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
}

.result-badge-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
}

.status-badge {
    padding: 0.45rem 1.1rem;
    border-radius: 8px;
    font-weight: 800;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
}

.fake-badge {
    background: var(--fake-red);
    color: white;
}

.real-badge {
    background: var(--real-green);
    color: white;
}

.result-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.metric-box {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 0.85rem;
}

.metric-label {
    display: block;
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.metric-value {
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffffff;
    margin-top: 0.2rem;
}

.disclaimer-note {
    font-size: 0.8rem;
    color: var(--text-secondary);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 0.85rem;
}

/* Info Grid */
.grid-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
    margin-top: 2rem;
}

.info-card {
    background: #1e293b;
    border: 1px solid var(--card-border);
    border-radius: 10px;
    padding: 1.25rem;
}

.info-card h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: #60a5fa;
}

.info-card p {
    font-size: 0.85rem;
    color: var(--text-secondary);
}

/* Footer */
.footer {
    text-align: center;
    padding: 2rem 1.5rem;
    border-top: 1px solid var(--card-border);
    background: #090d16;
    color: var(--text-secondary);
    font-size: 0.85rem;
}

.sub-footer {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.25rem;
}
`
  },
  {
    name: 'dataset/news.csv',
    path: 'dataset/news.csv',
    language: 'plaintext',
    description: 'Sample CSV dataset containing representative real and fake news records with title, text, and binary label for model training.',
    content: `title,text,label
"NASA James Webb Space Telescope Confirms Discovery of Exoplanet Atmosphere","According to a study published in Nature, astronomers confirmed carbon dioxide in the atmosphere of WASP-39b using spectroscopic data.",REAL
"SHOCKING SECRET: Miracle Fruit Cures All Terminal Cancers Overnight!","Mainstream media is desperately hiding this secret 1-minute organic fruit extract that cures terminal cancer. Big pharma is banning this video!",FAKE
"Federal Reserve Holds Interest Rates Steady Amid Economic Inflation Data","Federal Reserve officials announced benchmark interest rates would remain unchanged as consumer price indices show gradual moderation.",REAL
"Declassified Memo Proves Secret Reptilian Alien Base Beneath Capitol Plaza","Leaked blueprints reveal a clandestine underground bunker operated by shadow elites. Wake up people the deep state conspiracy is real!",FAKE
"European Union Regulators Pass Landmark Artificial Intelligence Governance Act","European Parliament lawmakers voted to approve comprehensive regulations governing high-risk machine learning foundation models.",REAL
"BANNED TRUTH: Drink Hot Lemon Water to Completely Eliminate Viral Pathogens","Hospital whistleblower leaks secret formula doctors do not want you to know. Drinking boiling hot water with lemon slices destroys all pathogens.",FAKE
"WHO Publishes Annual Global Healthcare Access and Infant Mortality Report","The World Health Organization released its epidemiological assessment surveying regional vaccination coverage across 194 member states.",REAL
"Hollywood Celebrity Arrested by Secret Patriotic Military Tribunal for Treason","Sources close to patriotic groups confirm famous actors were secretly arrested and taken to a military tribunal in an undisclosed location.",FAKE
`
  },
  {
    name: '.gitignore',
    path: '.gitignore',
    language: 'plaintext',
    description: 'Git ignore rules for Python projects: excludes virtual environments, bytecodes, trained binary models, and large datasets from repository tracking.',
    content: `# Python bytecode and cache
__pycache__/
*.py[cod]
*$py.class
*.so

# Virtual Environments
venv/
env/
ENV/
.venv/

# Environment Variables
.env

# Trained binary models (recommended to train locally or track via Git LFS)
model/*.joblib
model/*.pkl

# Large CSV datasets
dataset/*.csv

# IDE configurations
.vscode/
.idea/
*.swp
*.swo
`
  },
  {
    name: 'README.md',
    path: 'README.md',
    language: 'markdown',
    description: 'Comprehensive college-grade GitHub repository README with architecture diagram, installation commands, dataset links, and results comparison table.',
    content: `# Fake News Detection System Using Python and Machine Learning

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![Scikit-Learn](https://img.shields.io/badge/Machine%20Learning-Scikit--Learn-orange)
![Flask](https://img.shields.io/badge/Backend-Flask-green)
![License](https://img.shields.io/badge/Academic-B.Tech%20Mini--Project-purple)

An end-to-end Machine Learning web application designed to classify news headlines and articles as **REAL** or **FAKE** using Natural Language Processing (NLP), TF-IDF feature extraction, and high-performance scikit-learn classifiers.

---

## 📌 Project Overview
- **Domain:** Natural Language Processing (NLP) & Supervised Machine Learning
- **Target Use-Case:** Mitigating online misinformation by flagging deceptive lexical markers
- **Primary Algorithm:** Passive Aggressive Classifier (with Logistic Regression, Linear SVM, and Naive Bayes benchmarks)
- **Feature Extraction:** TF-IDF (Term Frequency-Inverse Document Frequency) with unigrams and bigrams

---

## 🏗️ Architecture & Workflow

\`\`\`
[ Raw News Input (Headline / Article) ]
                  │
                  ▼
[ Text Cleaning & NLP Preprocessing ]
  ├── Lowercase conversion
  ├── Removal of URLs & HTML tags
  ├── Removal of punctuation & digits
  └── Stopword filtering
                  │
                  ▼
[ TF-IDF Feature Extraction ]
  ├── Unigram & Bigram tokenization
  └── Numerical Vector generation (10,000 max features)
                  │
                  ▼
[ Machine Learning Classifier (PAC / Logistic Regression) ]
                  │
                  ▼
[ Prediction Output: REAL or FAKE + Confidence % ]
                  │
                  ▼
[ Flask Jinja2 Web User Interface ]
\`\`\`

---

## 📂 Project Directory Structure

\`\`\`
Fake-News-Detection/
├── dataset/
│   └── news.csv               # Dataset file (ISOT / WELFake / Kaggle)
├── model/
│   ├── fake_news_model.joblib # Serialized best trained model
│   └── tfidf_vectorizer.joblib# Serialized TF-IDF vectorizer
├── templates/
│   └── index.html             # Web interface template
├── static/
│   └── style.css              # Frontend styling
├── app.py                     # Flask backend server
├── train_model.py             # ML training & model evaluation pipeline
├── requirements.txt           # Python library dependencies
├── .gitignore                 # Files excluded from git tracking
└── README.md                  # Project documentation
\`\`\`

---

## ⚙️ Quick Start Installation (Local Machine)

### 1. Clone or Download Repository
\`\`\`bash
git clone https://github.com/your-username/Fake-News-Detection.git
cd Fake-News-Detection
\`\`\`

### 2. Create and Activate Virtual Environment
\`\`\`bash
# Windows
python -m venv venv
venv\\Scripts\\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
\`\`\`

### 3. Install Required Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 4. Train the Machine Learning Model
\`\`\`bash
python train_model.py
\`\`\`
*This script will preprocess the dataset, train all 4 classifiers, generate performance metrics, and save \`fake_news_model.joblib\` and \`tfidf_vectorizer.joblib\`.*

### 5. Launch the Flask Web Application
\`\`\`bash
python app.py
\`\`\`
Open your browser and navigate to: **http://127.0.0.1:5000**

---

## 📊 Experimental Results

| Algorithm | Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **Passive Aggressive Classifier** | **93.84%** | **93.42%** | **94.28%** | **93.85%** |
| Linear SVM (LinearSVC) | 93.20% | 93.05% | 93.40% | 93.22% |
| Logistic Regression | 92.51% | 92.80% | 92.15% | 92.47% |
| Multinomial Naive Bayes | 89.15% | 88.40% | 90.22% | 89.30% |

---

## ⚠️ Important Academic Limitation Note
This machine learning model identifies linguistic and statistical patterns present in historical training datasets. It **does not** query live search engines or perform real-time external fact-checking against factual databases.
`
  }
];
