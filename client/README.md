# TODO

谢谢认可！清晰、低耦合的代码结构可以显著提升项目的可维护性和扩展性。希望这个架构能帮助你更高效地管理和开发项目。接下来，如果你需要任何具体的代码实现或进一步的优化建议，请随时告诉我。以下是项目的简洁版结构和一些重点代码片段：

### 项目结构

```
src/
|-- api/
|   |-- poems.js
|-- components/
|   |-- Navbar.jsx
|   |-- Footer.jsx
|   |-- Poem/
|       |-- PoemCard.jsx
|       |-- PoemList.jsx
|-- contexts/
|   |-- UIContext.js
|-- hooks/
|   |-- useFetchPoems.js
|   |-- useLikePoem.js
|   |-- useSearch.js
|-- pages/
|   |-- HomePage.jsx
|   |-- TangCollection.jsx
|   |-- SongCollection.jsx
|   |-- ShijingCollection.jsx
|   |-- SearchPage.jsx
|-- App.js
|-- index.js
```

### 重点代码片段

#### 1. API 请求文件

`api/poems.js`:

```javascript
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export const fetchPoems = async (endpoint, page = 1) => {
  const response = await axios.get(`${API_BASE_URL}/${endpoint}?page=${page}`);
  return response.data;
};

export const fetchRandomPoems = async () => {
  const response = await axios.get(`${API_BASE_URL}/poems/random-poems`);
  return response.data;
};

export const likePoem = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/poems/like/${id}`);
  return response.data;
};
```

#### 2. React Query 自定义 Hook

`hooks/useFetchPoems.js`:

```javascript
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchPoems, fetchRandomPoems, likePoem } from "../api/poems";

export const usePoems = (endpoint, page) => {
  return useQuery(
    ["poems", { endpoint, page }],
    () => fetchPoems(endpoint, page),
    {
      enabled: !!endpoint,
    }
  );
};

export const useRandomPoems = () => {
  return useQuery("randomPoems", fetchRandomPoems);
};

export const useLikePoem = () => {
  const queryClient = useQueryClient();
  return useMutation(likePoem, {
    onSuccess: () => {
      queryClient.invalidateQueries("poems");
      queryClient.invalidateQueries("randomPoems");
    },
  });
};
```

#### 3. Context API

`contexts/UIContext.js`:

```javascript
import React, { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const value = {
    isModalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
```

#### 4. 组件和页面

`pages/HomePage.jsx`:

```javascript
import React from "react";
import { useRandomPoems, useLikePoem } from "../hooks/useFetchPoems";
import PoemList from "../components/Poem/PoemList";

const HomePage = () => {
  const { data, error, isLoading } = useRandomPoems();
  const { mutate: likePoem } = useLikePoem();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        {error.message}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold my-4">随机唐诗宋词</h2>
      {data && (
        <>
          <PoemList poems={data.tangPoems} type="poetry" onLike={likePoem} />
          <PoemList poems={data.songPoems} type="poetry" onLike={likePoem} />
        </>
      )}
    </div>
  );
};

export default HomePage;
```

`components/Poem/PoemCard.jsx`:

```javascript
import { BiLike } from "react-icons/bi";

const PoemCard = ({ poem, type, onLike }) => {
  const handleLike = () => {
    onLike(poem._id);
  };

  return (
    <div className="max-w-xl w-full my-4">
      <div className="hover:border-green-300 border border-gray-300 bg-white rounded-lg p-8 flex flex-col justify-center items-center shadow-lg">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="mt-4 text-neutral-800 font-bold text-lg md:text-xl mb-2">
            {poem.title || poem.rhythmic}
          </div>
          <p className="text-slate-500 text-sm md:text-lg m-2">{poem.author}</p>
          {type === "shijing" && (
            <div className="text-slate-500 text-sm md:text-lg m-2">
              {poem.chapter} - {poem.section}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          {poem.paragraphs &&
            poem.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-neutral-800 text-base md:text-xl my-4 "
              >
                {paragraph}
              </p>
            ))}
          {poem.content &&
            poem.content.map((line, index) => (
              <p
                key={index}
                className="text-neutral-800 text-base md:text-xl my-4 "
              >
                {line}
              </p>
            ))}
        </div>
        <button
          onClick={handleLike}
          className="w-24 flex justify-center items-center py-2 bg-green-200 text-neutral-700 hover:text-white rounded-lg hover:bg-green-700"
        >
          <BiLike className="mr-2" /> {poem.like}
        </button>
      </div>
    </div>
  );
};

export default PoemCard;
```

通过这种方式，你可以高效地管理数据和状态，保持代码的清晰和模块化。如果有更多的具体需求或优化建议，请继续告知。
