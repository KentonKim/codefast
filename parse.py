import pathlib
from os import path
import ast
import random
import glob
import argparse

#   EXAMPLE USAGES   #

#pgen = PythonCodeGenerator()
#print(pgen.get_random_randomized_python_string())

standard_lib = dir(__builtins__)
cwd = pathlib.Path(__file__).parent.resolve()

class PythonCodeGenerator():
    class MyVisitor(ast.NodeVisitor):
            def get_set_random(self, identifier:str):
                if identifier in self.get_set:
                    return self.get_set[identifier]
                else:
                    word = random.choice(list(self.words))
                    if identifier.isupper():
                        self.get_set[identifier] = word.upper()
                    elif identifier[0].isupper():
                        self.get_set[identifier] = word[0].upper() + word[1:]
                    else:
                        self.get_set[identifier] = word

                    return identifier

            def visit_Module(self, node):
                self.get_set = {}
                self.words = PythonCodeGenerator.words
                self.generic_visit(node)
                self.generic_visit(node)
            def visit_Name(self, node):
                if node.id not in standard_lib:
                    node.id = self.get_set_random(node.id)
            def visit_ClassDef(self, node):
                if node.name not in standard_lib:
                    node.name = self.get_set_random(node.name)
                self.generic_visit(node)
            def visit_Attribute(self, node):
                if node.attr not in standard_lib:
                    node.attr = self.get_set_random(node.attr)
                self.generic_visit(node)
            def visit_FunctionDef(self, node):
                if node.name not in standard_lib:
                    node.name = self.get_set_random(node.name)
                for arg in node.args.args:
                    if arg.arg not in standard_lib:
                        arg.arg = self.get_set_random(arg.arg)
                self.generic_visit(node)
            
    with open(path.join(cwd, 'words.txt')) as f:
        words = set(f.read().split("\n"))

    def get_python_string(self):
        random_file = random.choice(list(glob.iglob(path.join(cwd, "Python/*.py"))))
        with open(random_file, "r") as f:
            return f.read()
    
    def randomize_python_string(self, s):
        def filter_comments(node):
            return not isinstance(node, ast.Expr) or not isinstance(node.value, ast.Str)

        tree = ast.parse(s)

        visitor = self.MyVisitor()
        visitor.visit(tree)

        tree.body = list(filter(filter_comments, tree.body))
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                node.body = list(filter(filter_comments, node.body))

        out = ast.unparse(tree)
        return out
    
    def get_random_randomized_python_string(self):
        return self.randomize_python_string(self.get_python_string())

    def get_randomized_python_string(self, p):
        with open(path.join(cwd, p), "r") as f:
            return self.randomize_python_string(f.read())

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="A simple script to read a file path.")

    parser.add_argument("--file", help="Path to the file you want to process.")

    args = parser.parse_args()

    pgen = PythonCodeGenerator()
    if args.file:
        print(pgen.get_randomized_python_string(args.file))
    else:
        print(pgen.get_random_randomized_python_string())