import pathlib
from os import path
import ast
import random
from xxlimited import Str

standard_lib = dir(__builtins__)

cwd = pathlib.Path(__file__).parent.resolve()

#read filestr from file path
code = "Python/ast_test.py"
with open(path.join(cwd, code), "r") as f:
    filestr = f.read()

#list of 1000 most common english words
with open(path.join(cwd, 'words.txt')) as f:
    words = set(f.read().split("\n"))

class MyVisitor(ast.NodeVisitor):
    def get_set_random(self, identifier:str):
        if identifier in self.get_set:
            return self.get_set[identifier]
        else:
            word = random.choice(list(words))
            words.remove(word)
            assert words
            if identifier.isupper():
                self.get_set[identifier] = word.upper()
            elif identifier[0].isupper():
                self.get_set[identifier] = word[0].upper() + word[1:]
            else:
                self.get_set[identifier] = word

            return identifier

    def visit_Module(self, node):
        self.get_set = {}
        self.generic_visit(node)
        self.generic_visit(node)
    def visit_Name(self, node):
        if node.id not in standard_lib:
            node.id = self.get_set_random(node.id)
    def visit_ClassDef(self, node):
        if node.name not in standard_lib:
            node.name = self.get_set_random(node.name)
        self.generic_visit(node)
    def visit_FunctionDef(self, node):
        if node.name not in standard_lib:
           node.name = self.get_set_random(node.name)
        for arg in node.args.args:
            if arg.arg not in standard_lib:
                arg.arg = self.get_set_random(arg.arg)
        self.generic_visit(node)

def filter_comments(node):
    return not isinstance(node, ast.Expr) or not isinstance(node.value, ast.Str)

tree = ast.parse(filestr)

visitor = MyVisitor()
visitor.visit(tree)

# Remove Comments!!!
tree.body = list(filter(filter_comments, tree.body))
for node in ast.walk(tree):
    if isinstance(node, ast.FunctionDef):
        node.body = list(filter(filter_comments, node.body))

out = ast.unparse(tree)
print(out)



