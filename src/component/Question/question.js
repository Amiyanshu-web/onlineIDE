import React from 'react'
import './question.css'
function Question() {
    return (
        <>
            <div className="container" style={{textAlign:'left'}}>
                <div className="d-flex flex-column bd-highlight mb-3">
                    <div className="topic">
                        <h2>Sample Question</h2>
                    </div>
                    <div className="statement text-wrap">
                        Given a String s, count all special palindromic substrings of size greater than 1. A Substring is called special palindromic substring if all the characters in the substring are same or only the middle character is different for odd length. Example “aabaa” and “aaa” are special palindromic substrings and “abcba” is not a special palindromic substring.
                        <br />
                    </div>
                        <br />

                    <div className="constrain">
                        <span>
                            <strong>Constraints: </strong>{`1 <= |S| <= 105`}
                        </span>
                    </div>
                        <br />
                        <strong className='example-number'>Example 1:</strong>
                    <div className="example">
                        <pre className="example-content">
                            <strong>Input:</strong> S = "abab"
                            <br />
                            <strong>Output:</strong> 2
                            <br />
                            <strong>Explanation:</strong>{`All Special Palindromic substring size > 1 are : "aba", "bab"`}
                        </pre>
                    </div>
                        <strong className='example-number'>Example 2:</strong>
                    <div className="example">
                        <pre className="example-content" >
                            <strong>Input:</strong> S = "aaba"
                            <br />
                            <strong>Output:</strong> 2
                            <br />
                            <strong>Explanation:</strong>{`All Special Palindromic substring size > 1 are: "aa", "aba".`}
                        </pre>

                    </div>
                        <br />
                        <br />
                    <div className="user-task">
                        <strong>User Task: </strong>
                        Your task is to complete the function CountSpecialPalindrome() which takes a single argument(string str) and returns the count of special palindromic substrings. You need not take any input or print anything.
                    </div>
                </div>
            </div>



        </>
    )
}

export default Question