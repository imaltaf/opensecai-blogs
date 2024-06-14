---
title: bugbounty recon tips 
date: '2022-12-21'
tags: ['cybersecurity', 'bugbounty', 'recon']
draft: false
summary: "
This guide outlines a comprehensive subdomain enumeration process for a given domain ($DM). It leverages multiple tools and APIs such as crt.sh, hackertarget, riddler, assetfinder, Sublist3r, subfinder, amass, crobat, ffuf, and gobuster to gather and validate subdomains. The script is divided into stages, including initial enumeration, fuzzing, and result aggregation. Notifications are used to track progress at each stage. The final output is a filtered and comprehensive list of subdomains associated with the target domain.





"
---



# Comprehensive Subdomain Enumeration and Discovery

## Overview

This guide provides a detailed approach to perform subdomain enumeration and discovery for a given domain (example.com). By utilizing various tools and APIs, we can compile a comprehensive list of subdomains associated with the target domain. The process is divided into multiple stages, ensuring thorough coverage and validation.

## Prerequisites

Ensure you have the following tools installed:

- curl
- jq
- sed
- sort
- grep
- anew
- assetfinder
- Sublist3r
- subfinder
- amass
- crobat
- ffuf
- gobuster
- notify

## Enumeration Script

Below is the complete script used for subdomain enumeration:

# Stage 1: Initial Subdomain Enumeration
## crt.sh
```bash
curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' 2>/dev/null | sed 's/\*\.//g' | sort -u | grep -o "\w.*example.com" | anew -q .tmp/cert_example.com.list
```
## hackertarget.com
```sh
curl -s "https://api.hackertarget.com/hostsearch/?q=example.com" | grep -o "\w.*example.com" | anew -q .tmp/htarget_example.com.list
```
## riddler.io
```sh
curl -s "https://riddler.io/search/exportcsv?q=pld:example.com" | grep -Po "(([\w.-]*)\.([\w]*)\.([A-z]))\w+" | grep -o "\w.*example.com" | anew -q .tmp/riddler_example.com.list
```
## Assetfinder
```sh
assetfinder --subs-only example.com | anew -q .tmp/assetfinder_example.com.list
```
## sublist3r
```sh
python3 ~/tools/Sublist3r/sublist3r.py -d example.com -o .tmp/sublister_example.com.list &> /dev/null
```
## Subfinder
```sh
subfinder -silent -d example.com -all -t 100 -o .tmp/subfinder_example.com.list &> /dev/null
```
## Amass
```sh
amass enum -passive -d example.com -o .tmp/amass_example.com.list &> /dev/null
```
## Crobat
```sh
crobat -s example.com | anew -q .tmp/crobat_example.com.list
```


# Stage 2: Fuzzing for Subdomains
## ffuf
```sh
ffuf -u http://FUZZ.example.com/ -t 100 -p '1.0-2.0' -w ~/wordlists/subdomains.txt -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36" -mc 200 -r -o .tmp/ffuf_example.com.json -s 2> /dev/null &> /dev/null
echo -e "ffuf completed on example.com at $(date)" | notify -silent
```
## gobuster
```sh
gobuster dns -d example.com --no-error -z -q -t 100 -w ~/wordlists/subdomains.txt 2> /dev/null | sed 's/Found: //g' | anew -q .tmp/gobuster_example.com.list
echo -e "gobuster completed on example.com  | notify -silent
```
## amass
```sh
amass enum -active -brute -w ~/wordlists/subdomains.txt -d example.com -o .tmp/amassact_example.com.list &> /dev/null
echo -e "amass completed on example.com " | notify -silent
```



# Stage 3: Aggregating and Filtering Results

```sh
cat .tmp/*.list | grep -v "*" | sed '/@\|<BR>\|\_\|*/d' | grep "example.com" | anew -q .tmp/domains
xargs -a .tmp/domains -P 50 -I % bash -c "assetfinder --subs-only % | anew -q .tmp/seconddomains_example.com.list" 2> /dev/null
```

```sh
timeout 30m xargs -a .tmp/domains -P 10 -I % bash -c "amass enum -passive -d %" 2> /dev/null | anew -q .tmp/seconddomains_example.com.list
```
