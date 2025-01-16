import tkinter as tk

from controller.main_controller import MainController
from utils.database import engine, SessionLocal
from models.base import Base

def main():
    root = tk.Tk()
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    app = MainController(root, session)
    root.mainloop()

if __name__ == "__main__":
    main()