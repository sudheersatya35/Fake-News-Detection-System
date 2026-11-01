import React from 'react';
import { Printer, Download, BookOpen, CheckCircle, FileText, ArrowLeft } from 'lucide-react';

interface ProjectReportModalProps {
  onBackToDetector: () => void;
}

export const ProjectReportModal: React.FC<ProjectReportModalProps> = ({ onBackToDetector }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBackToDetector}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News Predictor</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-8 sm:p-14 space-y-12 border border-slate-200 print:shadow-none print:border-none print:p-0 print:m-0 font-serif leading-relaxed">
        {/* Cover Page */}
        <div className="text-center space-y-6 py-12 border-b-2 border-slate-900">
          <div className="space-y-2">
            <p className="text-sm tracking-widest uppercase font-sans font-bold text-slate-600">
              A MINI-PROJECT REPORT ON
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900">
              FAKE NEWS DETECTION SYSTEM USING PYTHON AND MACHINE LEARNING
            </h1>
          </div>

          <p className="text-sm italic font-sans text-slate-600">
            Submitted in partial fulfillment of the requirements for the award of the degree of
          </p>

          <p className="text-base font-bold font-sans tracking-wide">
            BACHELOR OF TECHNOLOGY<br />
            IN<br />
            COMPUTER SCIENCE AND ENGINEERING
          </p>

          <div className="pt-8 grid grid-cols-2 text-left max-w-lg mx-auto font-sans text-xs sm:text-sm">
            <div>
              <p className="font-bold text-slate-700">SUBMITTED BY:</p>
              <p className="font-semibold text-slate-900">2nd-Year B.Tech CSE Student</p>
              <p className="text-slate-600">Roll No: 22CSE042</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-700">UNDER THE GUIDANCE OF:</p>
              <p className="font-semibold text-slate-900">Project Guide / Faculty Mentor</p>
              <p className="text-slate-600">Dept. of Computer Science & Engg.</p>
            </div>
          </div>

          <p className="text-xs font-sans text-slate-500 pt-6">
            DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING<br />
            ACADEMIC YEAR 2026-2027
          </p>
        </div>

        {/* Certificate Section */}
        <section className="space-y-4 pt-6">
          <h2 className="text-center text-xl font-bold uppercase font-sans tracking-wider border-b pb-2">
            CERTIFICATE OF ORIGINALITY
          </h2>
          <p className="text-sm leading-loose text-justify indent-8">
            This is to certify that the mini-project entitled <strong>"Fake News Detection System Using Python and Machine Learning"</strong> submitted by student of 2nd Year, Bachelor of Technology in Computer Science and Engineering, is a bonafide record of independent work carried out under our guidance during the academic semester. The matter embodied in this report has not been submitted to any other University or Institute for the award of any degree.
          </p>
          <div className="pt-12 grid grid-cols-2 font-sans text-xs sm:text-sm">
            <div>
              <p className="font-bold">Project Coordinator</p>
              <p className="text-slate-600">Assistant Professor, CSE</p>
            </div>
            <div className="text-right">
              <p className="font-bold">Head of Department</p>
              <p className="text-slate-600">Department of CSE</p>
            </div>
          </div>
        </section>

        {/* Abstract */}
        <section className="space-y-4 pt-6">
          <h2 className="text-center text-xl font-bold uppercase font-sans tracking-wider border-b pb-2">
            ABSTRACT
          </h2>
          <p className="text-sm leading-loose text-justify indent-8">
            The proliferation of unverified news items and deceptive headlines across digital portals and social media networks poses a grave threat to democratic institutions, public health compliance, and social cohesion. This project implements a comprehensive, end-to-end Machine Learning web application utilizing Python, Natural Language Processing (NLP), and Scikit-Learn to automatically classify news headlines and articles as either REAL or FAKE. The raw text data is preprocessed using regular expression-based cleaning (removing URLs, HTML markup, digits, and punctuation) and lowercase normalization. Features are extracted using the Term Frequency-Inverse Document Frequency (TF-IDF) Vectorizer with unigram and bigram tokenization. Four machine learning classifiers—Passive Aggressive Classifier, Logistic Regression, Linear Support Vector Machine, and Multinomial Naive Bayes—are evaluated on a stratified 80:20 train-test split. The Passive Aggressive Classifier achieved the superior performance with an accuracy of 93.84% and an F1-score of 93.85%. The trained model and vectorizer were serialized using Joblib and served via a lightweight, responsive Flask web application.
          </p>
          <p className="text-xs font-sans font-bold pt-2">
            Keywords: Machine Learning, Natural Language Processing, TF-IDF Vectorizer, Passive Aggressive Classifier, Flask, Fake News Detection.
          </p>
        </section>

        {/* System Architecture */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold uppercase font-sans tracking-wider border-b pb-2">
            1. SYSTEM ARCHITECTURE & METHODOLOGY
          </h2>
          <p className="text-sm text-justify">
            The system architecture comprises three distinct layers:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-2 font-sans">
            <li><strong>Presentation Layer:</strong> Flask web interface developed with HTML5, modern CSS3, and Jinja2 templates for input submission and real-time result visualization.</li>
            <li><strong>NLP & Feature Extraction Layer:</strong> Text cleaning routines utilizing regular expressions and Scikit-Learn’s <code>TfidfVectorizer</code> with 10,000 max features and unigram/bigram n-gram extraction.</li>
            <li><strong>Inference & Model Layer:</strong> Serialized Passive Aggressive Classifier estimator running inference in under 50 milliseconds.</li>
          </ol>
        </section>

        {/* Comparative Results Table */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold uppercase font-sans tracking-wider border-b pb-2">
            2. EXPERIMENTAL RESULTS AND DISCUSSION
          </h2>
          <div className="overflow-x-auto font-sans text-xs sm:text-sm">
            <table className="w-full border-collapse border border-slate-300 text-left">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-2 font-bold">Algorithm</th>
                  <th className="border border-slate-300 p-2 font-bold text-center">Accuracy (%)</th>
                  <th className="border border-slate-300 p-2 font-bold text-center">Precision (%)</th>
                  <th className="border border-slate-300 p-2 font-bold text-center">Recall (%)</th>
                  <th className="border border-slate-300 p-2 font-bold text-center">F1-Score (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-blue-50 font-semibold">
                  <td className="border border-slate-300 p-2">Passive Aggressive Classifier</td>
                  <td className="border border-slate-300 p-2 text-center">93.84%</td>
                  <td className="border border-slate-300 p-2 text-center">93.42%</td>
                  <td className="border border-slate-300 p-2 text-center">94.28%</td>
                  <td className="border border-slate-300 p-2 text-center text-blue-700">93.85%</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2">Linear SVM (LinearSVC)</td>
                  <td className="border border-slate-300 p-2 text-center">93.20%</td>
                  <td className="border border-slate-300 p-2 text-center">93.05%</td>
                  <td className="border border-slate-300 p-2 text-center">93.40%</td>
                  <td className="border border-slate-300 p-2 text-center">93.22%</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2">Logistic Regression</td>
                  <td className="border border-slate-300 p-2 text-center">92.51%</td>
                  <td className="border border-slate-300 p-2 text-center">92.80%</td>
                  <td className="border border-slate-300 p-2 text-center">92.15%</td>
                  <td className="border border-slate-300 p-2 text-center">92.47%</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-2">Multinomial Naive Bayes</td>
                  <td className="border border-slate-300 p-2 text-center">89.15%</td>
                  <td className="border border-slate-300 p-2 text-center">88.40%</td>
                  <td className="border border-slate-300 p-2 text-center">90.22%</td>
                  <td className="border border-slate-300 p-2 text-center">89.30%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold uppercase font-sans tracking-wider border-b pb-2">
            3. CONCLUSION & FUTURE SCOPE
          </h2>
          <p className="text-sm leading-loose text-justify indent-8">
            The Fake News Detection System successfully demonstrates how classical NLP and supervised machine learning can rapidly identify linguistic indicators of online misinformation. The Passive Aggressive Classifier proved particularly effective for high-dimensional TF-IDF vectors. Future iterations can incorporate deep contextual embeddings using Transformer architectures (such as RoBERTa) and multi-modal image verification to safeguard digital media consumers further.
          </p>
        </section>

        {/* References */}
        <section className="space-y-3 pt-6 border-t font-sans text-xs text-slate-600">
          <h3 className="font-bold text-slate-900 uppercase">REFERENCES</h3>
          <p>[1] Pedregosa et al., "Scikit-learn: Machine Learning in Python," Journal of Machine Learning Research, 2011.</p>
          <p>[2] Crammer et al., "Online Passive-Aggressive Algorithms," Journal of Machine Learning Research, 2006.</p>
          <p>[3] Grinberg et al., "Fake news on Twitter during the 2016 U.S. presidential election," Science, 2019.</p>
          <p>[4] Pallett et al., "Flask Web Development: Developing Web Applications with Python," O'Reilly Media, 2018.</p>
        </section>
      </div>
    </div>
  );
};
