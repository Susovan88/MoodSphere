from langchain_pinecone import PineconeVectorStore
from config import PINECONE_INDEX
from rag.embedding import embedding  # your embedding model

def get_vector_store():
    return PineconeVectorStore.from_existing_index(
        embedding=embedding,
        index_name=PINECONE_INDEX
    )

