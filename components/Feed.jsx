  "use client";
  import React from "react";
  import { useState, useEffect } from "react";
  import PromptCard from "./PromptCard";

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
        ))}
      </div>
    );
  };

  const Feed = () => {
    //search prompts by username,tag name ,words
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      const fetchPost = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
        setSearchedResults(data);
      };
      fetchPost();
    }, []);
    console.log(posts, "ooooooooooooooooo");
    const filterPrompts = (search) => {
      const regex = new RegExp(search, "i"); //i flag for case insensitive
      //search
      return posts.filter(
        (item) =>
          regex.test(item.creator.userName) ||
          regex.test(item.tag) ||
          regex.test(item.prompt)
      );
    };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
    };
    
    const handleTagClick = (tagName) => {
      setSearchText(tagName);
      const searchResult = filterPrompts(tagName);
      setSearchedResults(searchResult);
    };

    return (
      <section className="feed">
        <form className="relative w-full flex-flex-center">
          <input
            type="text"
            placeholder="Search for tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      </section>
    );
  };

  export default Feed;
