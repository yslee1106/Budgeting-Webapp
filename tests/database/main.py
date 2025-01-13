import database_test

def main() -> None:
    db = sa.create_engine("sqlite:///:memory:")
    Session = sessionmaker(bind=db)
    Base = declarative_base()

    Base.metadata.create_all(db)
    user = database_test.Entry(username="Arjan", email="Arjan@arjancodes.com")

    with Session() as session:
        session.add(user)
        session.commit()
        print(session.query(database_test.Entry).all())

if __name__ == "__main__":
    main()