Example/starter bashrc, mainly just the style of prompt I like and some aliases.

```bash
#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

# Sleek minimal prompt: dim context, bright path, accent symbol
PS1='\[\033[90m\]\u \[\033[0m\]\[\033[97m\]\w\[\033[0m\] \[\033[96m\]›\[\033[0m\] '

alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias ll='ls -al'
alias oc='opencode'
```