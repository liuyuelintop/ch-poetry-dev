import json
import sys

def rename_key(json_file, output_file, old_key, new_key):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    def rename_item(item):
        if isinstance(item, dict):
            if old_key in item:
                item[new_key] = item.pop(old_key)
            for key, value in item.items():
                rename_item(value)
        elif isinstance(item, list):
            for i in item:
                rename_item(i)

    rename_item(data)

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python rename_key.py <input-json-file> <output-json-file> <old-key> <new-key>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    old_key = sys.argv[3]
    new_key = sys.argv[4]

    rename_key(input_file, output_file, old_key, new_key)
    print(f"Key '{old_key}' has been renamed to '{new_key}'. Output saved to {output_file}")