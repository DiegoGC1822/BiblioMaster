import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import { LoanStudentTable } from "../components/LoanStudentTable";
import { RequestStudentTable } from "../components/RequestStudentTable";
import { RenovationStudentTable } from "../components/RenovationStudentTable";
import { FilterBook } from "../components/FilterBook";
import { useState } from "react";

export const BooksStudent = () => {
    const location = useLocation();
    const [word, setWord] = useState("");
    const [activate, setActivate] = useState(true);

    const handleBooks = () => {
        if (location.pathname === '/bookloan') {
            return (
                <>
                    <FilterBook activate={activate} setActivate={setActivate} setWord={setWord} word={word} />
                    <LoanStudentTable />
                </>
            );
        } else if (location.pathname === '/request') {
            return <RequestStudentTable />;
        } else {
            return <RenovationStudentTable />;
        }
    };

    return (
        <div>
            <Header />
            {handleBooks()}
        </div>
    );
}
