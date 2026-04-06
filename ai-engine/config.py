"""MetaRole AI — Configuration"""
import os
from dotenv import load_dotenv

load_dotenv()

# OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4-turbo-preview")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

# Vector DB (Pinecone)
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_ENV = os.getenv("PINECONE_ENV", "us-east-1")
PINECONE_INDEX = os.getenv("PINECONE_INDEX", "metarole-skills")

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "")

# App
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
MAX_RESUME_CHARS = 10_000
