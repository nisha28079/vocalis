\# Vocalis — AI-Powered Text-to-Speech Studio



Vocalis is a full-stack Text-to-Speech application that transforms written text into natural-sounding speech using the ElevenLabs API.



\## ✨ Features



\- Convert text into natural-sounding speech

\- Multiple AI voices

\- Language selection

\- Customizable speaking styles

\- Adjustable speech speed

\- Audio playback and MP3 download

\- Quick-start text templates

\- Responsive user interface

\- Light and dark themes

\- 5,000-character text limit



\## 🛠️ Tech Stack



\*\*Frontend\*\*

\- Next.js

\- React

\- TypeScript

\- Tailwind CSS



\*\*Backend\*\*

\- Python

\- Flask

\- Flask-CORS



\*\*AI Integration\*\*

\- ElevenLabs Text-to-Speech API



\## 📁 Project Structure



```text

vocalis/

├── backend/

│   ├── app.py

│   ├── requirements.txt

│   ├── routes/

│   └── services/

│

├── frontend/

│   ├── app/

│   ├── public/

│   ├── package.json

│   └── ...

│

└── .gitignore

```



\## ⚙️ Installation and Setup



\### 1. Clone the repository



```bash

git clone https://github.com/nisha28079/vocalis.git

cd vocalis

```



\### 2. Backend Setup



```bash

cd backend

python -m venv venv

```



Activate the virtual environment:



\*\*Windows:\*\*

```powershell

.\\venv\\Scripts\\Activate

```



Install dependencies:



```bash

pip install -r requirements.txt

```



Create a `.env` file inside the backend folder:



```env

ELEVENLABS\_API\_KEY=your\_api\_key\_here

```



Start the backend:



```bash

python app.py

```



Backend runs at `http://localhost:5000`.



\### 3. Frontend Setup



Open another terminal:



```bash

cd frontend

npm install

npm run dev

```



Frontend runs at `http://localhost:3000`.



\## 🔐 Environment Variables



| Variable | Description |

|---|---|

| `ELEVENLABS\_API\_KEY` | ElevenLabs API authentication key |



\*\*Important:\*\* Never upload your API key or `.env` file to GitHub.



\## 🚀 Future Improvements



\- My Audio library with saved generations

\- User authentication

\- Audio generation history

\- Additional language and voice options



\## 👩‍💻 Author



\*\*Nisha Singh\*\*



GitHub: \[@nisha28079](https://github.com/nisha28079)



\---



\*Vocalis — Give your words a voice.\*

