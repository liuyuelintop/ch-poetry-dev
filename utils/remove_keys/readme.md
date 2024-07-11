# JSON 属性删除器

这是一个用于从 JSON 文件中删除指定属性的 Python 脚本。

## 先决条件

在运行此脚本之前，您需要确保已安装 Python 环境。

## 使用方法

1. 将脚本保存为 `remove_keys.py`。
2. 创建一个 JSON 文件（例如 `input.json`），并将其与 `remove_keys.py` 脚本放在同一目录下。
3. 运行以下命令执行脚本：

```sh
python remove_keys.py <json-file> <key-to-remove> [<additional-keys-to-remove>...]
```

- `<json-file>`：要处理的 JSON 文件名。
- `<key-to-remove>`：要删除的属性名。
- `[<additional-keys-to-remove>...]`：可选，其他要删除的属性名。

### 示例

要删除一个属性：

```sh
python remove_keys.py input.json tags
```

要删除多个属性：

```sh
python remove_keys.py input.json tags name description
```

## 脚本说明

```python
import json
import sys

def remove_keys(obj, keys_to_remove):
    """递归删除对象中的指定属性"""
    if isinstance(keys_to_remove, str):
        keys_to_remove = [keys_to_remove]

    if isinstance(obj, list):
        for item in obj:
            remove_keys(item, keys_to_remove)
    elif isinstance(obj, dict):
        for key in keys_to_remove:
            obj.pop(key, None)
        for key in obj:
            remove_keys(obj[key], keys_to_remove)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_keys.py <json-file> <key-to-remove> [<additional-keys-to-remove>...]")
        sys.exit(1)

    input_file = sys.argv[1]
    keys_to_remove = sys.argv[2:]

    output_file = "output.json"

    # 读取JSON文件
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 删除指定的属性
    remove_keys(data, keys_to_remove)

    # 将修改后的数据写回文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Properties {keys_to_remove} have been removed. Output saved to {output_file}")
```

### 函数说明

- `remove_keys(obj, keys_to_remove)`：递归删除对象中的指定属性。`keys_to_remove` 可以是一个字符串或字符串列表。
- `if __name__ == "__main__"`：主函数，用于读取命令行参数并调用 `remove_keys` 函数。

### 处理逻辑

1. 脚本从命令行参数读取输入文件名和要删除的属性名。
2. 读取 JSON 文件并将其解析为 Python 对象。
3. 使用 `remove_keys` 函数递归地删除指定属性。
4. 将修改后的 JSON 数据写回输出文件 `output.json`。

## 注意事项

- 确保您的 JSON 文件格式正确，否则脚本将无法正常工作。
- 该脚本可以处理嵌套的字典和列表中的属性删除。。
