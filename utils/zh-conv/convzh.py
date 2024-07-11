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