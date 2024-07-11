import json
import sys

def add_keys(json_file, output_file, keys_with_initial_values):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    def add_keys_to_item(item):
        if isinstance(item, dict):
            for key, initial_value in keys_with_initial_values.items():
                item.setdefault(key, initial_value)
            for value in item.values():
                add_keys_to_item(value)
        elif isinstance(item, list):
            for i in item:
                add_keys_to_item(i)

    add_keys_to_item(data)

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python add_keys.py <input-json-file> <output-json-file> <key1>=<value1> [<key2>=<value2> ...]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    keys_with_initial_values = dict(arg.split('=') for arg in sys.argv[3:])

    # Convert values to appropriate types
    for key, value in keys_with_initial_values.items():
        try:
            keys_with_initial_values[key] = json.loads(value)
        except json.JSONDecodeError:
            pass

    add_keys(input_file, output_file, keys_with_initial_values)
    print(f"Keys {list(keys_with_initial_values.keys())} have been added with their initial values. Output saved to {output_file}")