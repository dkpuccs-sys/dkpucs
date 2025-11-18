"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const compilers = [
  {
    name: "Programiz Python Online Compiler",
    description: "An online Python compiler by Programiz.",
    link: "https://www.programiz.com/python-programming/online-compiler/",
  },
  {
    name: "NextLeap Online Python Compiler",
    description: "An online Python compiler by NextLeap.",
    link: "https://nextleap.app/online-compiler/python-programming",
  },
  {
    name: "W3Schools Python Compiler",
    description: "An online Python compiler by W3Schools.",
    link: "https://www.w3schools.com/python/python_compiler.asp",
  },
  {
    name: "OneCompiler Python",
    description: "An online Python compiler by OneCompiler.",
    link: "https://onecompiler.com/python",
  },
  {
    name: "CodeChef Python Online Compiler",
    description: "An online Python compiler by CodeChef.",
    link: "https://www.codechef.com/python-online-compiler",
  },
  {
    name: "Online-Python.com",
    description: "An online Python compiler.",
    link: "https://www.online-python.com/",
  },
]

export function PythonCompilerCards() {
  return (
    <div className="grid grid-cols-1 max-w-7xl mx-auto gap-4 p-4 md:grid-cols-2">
      {compilers.map((compiler) => (
        <a
          key={compiler.name}
          href={compiler.link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>{compiler.name}</CardTitle>
              <CardDescription>{compiler.description}</CardDescription>
            </CardHeader>
          </Card>
        </a>
      ))}
    </div>
  )
}
