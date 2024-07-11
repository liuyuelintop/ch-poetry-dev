### Usage

1. 将上述代码保存为 `add_keys.py`。
2. 确保你的 JSON 文件与脚本在同一目录下。
3. 运行脚本并传递输入文件、输出文件以及键和值的对：

```sh
python add_keys.py <input-json-file> <output-json-file> <key1>=<value1> [<key2>=<value2> ...]
```

### 示例

要添加一个 `like` 属性，初始值设为 0：

```sh
python add_keys.py input.json output.json like=0
```

要添加多个属性：

```sh
python add_keys.py input.json output.json like=0 views=100
```

### 脚本说明

- `add_keys(json_file, output_file, keys_with_initial_values)`：读取指定的 JSON 文件，添加指定的键及其初始值，并将结果保存到输出文件中。
- `add_keys_to_item(item)`：递归地将指定的键及其初始值添加到 JSON 文件中的每个字典项。
- `if __name__ == "__main__"`：主函数，从命令行参数读取输入文件名、输出文件名以及要添加的键值对，并调用 `add_keys` 函数进行操作。

### 注意事项

- 确保键值对的格式为 `<key>=<value>`。
- 值将被解析为 JSON 格式，因此可以传递字符串、数字、布尔值、列表或字典。

通过这种方式，你可以灵活地向 JSON 文件中添加任意的键及其初始值。
