from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

class RAGService:
    def __init__(self):
        self.llm = ChatOpenAI(model_name="gpt-3.5-turbo")
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = None
        self.setup_vectorstore()

    def setup_vectorstore(self):
        # Initialize vector store with your documents
        # This is where you'd load and process your knowledge base
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        
        # Example: Load and process documents
        # documents = text_splitter.split_documents(your_documents)
        # self.vectorstore = Chroma.from_documents(documents, self.embeddings)
        
        # For demo, we'll use a simple in-memory store
        self.vectorstore = Chroma(embedding_function=self.embeddings)

    async def generate_response(self, query: str) -> str:
        # RAG prompt template
        template = """Answer the question based on the following context:

        Context: {context}
        
        Question: {question}
        
        Answer: """
        
        prompt = ChatPromptTemplate.from_template(template)
        
        # RAG chain
        retriever = self.vectorstore.as_retriever()
        rag_chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | prompt
            | self.llm
        )
        
        # Generate response
        response = await rag_chain.ainvoke(query)
        return response.content