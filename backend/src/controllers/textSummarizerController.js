const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const summarizeText = async (req, res) => {
  try {
    const { text, num_sentences = 3 } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    }

    const options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '../../../hackathon_hackvortex'),
      args: [text, num_sentences.toString()]
    };

    PythonShell.run('text_summarizer.py', options).then(results => {
      const summary = results[0];
      res.json({
        success: true,
        data: {
          original_text: text,
          summary: summary
        }
      });
    }).catch(err => {
      console.error('Error running Python script:', err);
      res.status(500).json({
        success: false,
        message: 'Error processing text summarization',
        error: err.message
      });
    });
  } catch (error) {
    console.error('Error in summarizeText:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const summarizeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { num_sentences = 3 } = req.body;
    const filePath = req.file.path;

    const options = {
      mode: 'text',
      pythonPath: 'python3',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '../../../hackathon_hackvortex'),
      args: [filePath, num_sentences.toString()]
    };

    PythonShell.run('text_summarizer.py', options).then(results => {
      const summary = results[0];
      
      // Clean up uploaded file
      fs.unlinkSync(filePath);

      res.json({
        success: true,
        data: {
          summary: summary
        }
      });
    }).catch(err => {
      // Clean up uploaded file in case of error
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      console.error('Error running Python script:', err);
      res.status(500).json({
        success: false,
        message: 'Error processing file summarization',
        error: err.message
      });
    });
  } catch (error) {
    console.error('Error in summarizeFile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  summarizeText,
  summarizeFile
}; 