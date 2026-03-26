from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

from llm.gemini_model import chatModel
from llm.prompts import prompt
from rag.retriever import get_retriever


retriever = get_retriever()

question_answer_chain = create_stuff_documents_chain(
    chatModel,
    prompt
)

rag_chain = create_retrieval_chain(
    retriever,
    question_answer_chain
)


def get_ai_response(student_context, input_message):
    response = rag_chain.invoke({
        "student_context": student_context,
        "input": input_message
    })

    return response["answer"]