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