# JSON 繁体字转简体字转换器

这是一个用于将 JSON 文件中的繁体字转换为简体字的 Python 脚本。

## 先决条件

在运行此脚本之前，您需要确保已安装以下 Python 包：

- `zhconv`

您可以使用以下命令安装 `zhconv`：

```sh
pip install zhconv
```

## 使用方法

1. 将脚本保存为 `convert_traditional_to_simplified.py`。
2. 创建一个 JSON 文件（例如 `input.json`），并将其与 `convert_traditional_to_simplified.py` 脚本放在同一目录下。
3. 运行以下命令执行脚本：

```sh
python convert_traditional_to_simplified.py <input-json-file> <output-json-file>
```

- `<input-json-file>`：要处理的 JSON 文件名。
- `<output-json-file>`：保存转换后结果的 JSON 文件名。

### 示例

```sh
python convert_traditional_to_simplified.py input2.json output2.json
```

## 脚本说明

```python
import json
import sys
from zhconv import convert

def convert_traditional_to_simplified(json_file, output_file):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    def convert_item(item):
        if isinstance(item, str):
            return convert(item, 'zh-cn')
        elif isinstance(item, dict):
            return {k: convert_item(v) for k, v in item.items()}
        elif isinstance(item, list):
            return [convert_item(i) for i in item]
        else:
            return item

    converted_data = convert_item(data)

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(converted_data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_traditional_to_simplified.py <input-json-file> <output-json-file>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    convert_traditional_to_simplified(input_file, output_file)
    print(f"Conversion completed. Output saved to {output_file}")
```

### 函数说明

- `convert_traditional_to_simplified(json_file, output_file)`：读取指定的 JSON 文件，将其中的繁体字转换为简体字，并将结果保存到输出文件中。
- `convert_item(item)`：这是一个递归函数，用于处理 JSON 文件中的每个项。它可以处理字符串、字典和列表，并将繁体字转换为简体字。

### 处理逻辑

1. 脚本从命令行参数读取输入文件名和输出文件名。
2. 读取 JSON 文件并将其解析为 Python 对象。
3. 使用 `convert_item` 函数递归地转换繁体字为简体字。
4. 将修改后的 JSON 数据写回输出文件。

## 注意事项

- 确保您的 JSON 文件格式正确，否则脚本将无法正常工作。
- 该脚本可以处理嵌套的字典和列表中的繁体字转换。

---

将上述内容保存到名为 `README.md` 的文件中，即可作为该脚本的使用说明文档。
