import React from 'react'
import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br/>
        <span className="orange_gradient text-center">AI-Powered Prompts </span>
      </h1>
      <p className='desc text-center'>Promptopia is  an Open-Source AI Prompting Tool For Modern World To Discover , Create And Share Creative Prompts</p>
      <Feed/>
    </section>
  );
}

export default Home